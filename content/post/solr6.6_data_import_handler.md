+++
date = "2017-07-19T15:46:40.013Z"
draft = true
title = "Solr 6.X.X Data Import Handler CockroachDB and PostgresDB"
tags = ["programming"]
+++

# Solr 6.6+ Data Import Handler (DIH) CockroachDB and PostgresDB

## Prerequisites
Download the latest solr from the apache solr website.
Download postgres driver [Postgres JDBC Driver](https://jdbc.postgresql.org/download/postgresql-42.1.1.jar) or if you are running mysql or oracle download the corresponding JDBC driver for those database.

Extract the solr archive to a folder of your choice
```
$ unzip solr.6.X.X.zip <destination>
```

Copy postgres driver to /solr-6.6.0/server/lib 
```
$ cp postgresql-42.1.1.jar /solr-6.6.0/server/lib 
```

## Creating a new solr configset


Create a new configset based off of basic_config
```
$ cp -r /solr-6.6.0/server/solr/configsets/basic_config /solr-6.6.0/server/solr/configsets/dih
```

Edit the newly created configset solrconfig.xml /solr-6.6.0/server/solr/configsets/dih/conf/solrconfig.xml and add the block below:
```
<requestHandler name="/dataimport" class="solr.DataImportHandler">
    <lst name="defaults">
      <str name="config">data-config.xml</str>
    </lst>
</requestHandler
```

By adding the above we have included the dependency for data importing.

## Database configuration

Edit/Create a data-config.xml file /solr-6.6.0/server/solr/configsets/dih/conf/data-config.xml
```
<dataConfig>
  <dataSource driver="org.postgresql.Driver"
              url="jdbc:postgresql://cockroachdb.local:26257/schema?sslmode=disable"
              user="username" 
              password="password"/>
  <document>
    <entity name="table" query="select * from schema.table">
      <field name="id" column="id" />
    </entity>
  </document>
</dataConfig>
```

The block above tells solr how to connect to our database and what columns to extract in this case all of them. The xml field tag tells solr what column to use for id. This can be a primary key or a row number. Solr will complain if you don't give it an id or if it can't automatically do it.

## Create the schema
Solr has its own managed-schema file that tries at best to map your columns to its managed field types so if it sees a column with _dt it will associated it with a date time field and will automatically create a document with the indexed field. However for all other fields solr can't detect you will have to define it yourself. In this case there are two ways of doing this.

**Method 1**: Create a schema.xml to capture database column fields

> *This method allows us to define fields ahead of time in a text file that correlates to our DB fields. The only downside is you need to restart the cluster in order to reflect the changes.*

Backup managed-schema and make a new copy as schema.xml
```
$ cp managed-schema schema.xml
$ mv managed-schema managed-schema.bkup
```

Here is an example field type that is already declared in our schema.xml

```<field name="id" type="string" indexed="true" stored="true" required="true" multiValued="false" />```

Say we have a facility_code column in our table that we want to be extracted, we can create a new field in our solr schema.xml file with the following

```<field name="facility_code" type="string" indexed="true" stored="true" required="true" multiValued="false" />```

Now when the data import handler is running it will know how to extract the facility column correctly and be able to index and query against it.

Once this is all done create a new core with the new configuration (dih) we created earlier and start solr cloud
```
$ solr-6.6.0/bin/solr start -e cloud -noprompt
$ solr-6.6.0/bin/solr create -c coreName -d dih 
```

**Method 2**: Through the web interface solrUI [http://localhost:8983/solr](http://localhost:8983/solr) **if solr cloud is already running*

> *This method is kind of tedious but is good when you need to make quick changes when altering your DB tables without having to restart your solr cluster.*

- Select core from dropdown
- Click on schema in the list
- Click Add Field button
- Enter name(column_name) and its field type
- Click add field


You should now be able to select your core from the dropdown on the side navigation below Thread Dump. Once you select it 

## Extracting the data
- Navigate to the solr web ui http://localhost:8983/solr
- Select your core in the dropdown on the right navigation
- Select data import
- If everything went right you should have see a populated screen
- Select fullimport from the command select box
- If you want you can enable auto-refresh by clicking on the auto-refresh status checkbox to keep track of your status else you will have to manually do it.
- Click Execute and it solr should begin extracting data from your DB.


## Unique Keys
Sometimes our DB table have more than one primary key and this can be tough for solr since it doesnt know how to handle multivalue primary keys right off the bat. In order to solve this issue we have two options. 
Let solr generate a unique UUID as the id or create a unique id using the tables composite primary keys.

### UUID Key
The first option will be equivalent to running the following in Java. ```UUID.randomUUID()```

If you don't know what id you need or have multple records with the same data then you can use a UUID generated id string as your key.
UUID's should always be unique. To do that edit your solr-config.xml with the following lines:

```
<updateRequestProcessorChain name="uuid">
<processor class="solr.UUIDUpdateProcessorFactory">
    <str name="fieldName">id</str>
</processor>
<processor class="solr.RunUpdateProcessorFactory" />
</updateRequestProcessorChain>

<requestHandler name="/dataimport" class="solr.DataImportHandler">
<lst name="defaults">
    <str name="config">data-config.xml</str>
    <str name="update.chain">uuid</str>      
</lst>
</requestHandler>
```

What the block above does is create a new processor named uuid and use the builtin solr UUIDUpdateProcessorFactory to generate a UUID and replace the field name id with it then run the update.
The second block above we add the update.chain uuid to our data import request handler.

### Composite Key
The second option, say we have primary key columns of key_cd, first_name, last_name, zip will string together the primary keys like so
```
key_cd-first_name-last_name-zip
```

Add the below to your solrconfig.xml
[API Documentation](https://lucene.apache.org/solr/6_6_0/solr-core/org/apache/solr/update/processor/CloneFieldUpdateProcessorFactory.html)
 ```
<updateRequestProcessorChain name="composite-id">
    <processor class="solr.CloneFieldUpdateProcessorFactory">
        <str name="source">facility_code</str>
        <str name="source">facility_name</str>
        <str name="source">facility_number</str>
        <str name="dest">id</str>
    </processor>
    <processor class="solr.ConcatFieldUpdateProcessorFactory">
        <str name="fieldName">id</str>
        <str name="delimiter">-</str>
    </processor>
    <processor class="solr.LogUpdateProcessorFactory" />
    <processor class="solr.RunUpdateProcessorFactory" />
</updateRequestProcessorChain>

<requestHandler name="/dataimport" class="solr.DataImportHandler">
    <lst name="defaults">
      <str name="config">data-config.xml</str>
      <str name="update.chain">composite-id</str>      
    </lst>
  </requestHandler>
```
What the block above does is create a new processor named composite and clone the fields into id with a hyphen delimiter then replace the field name id with it and run the update.
The second block above we add the update.chain composite-id to our data import request handler.
