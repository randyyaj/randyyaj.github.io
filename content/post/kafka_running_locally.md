+++
date = "2016-03-18T09:41:26-04:00"
draft = true
title = "Programming - Running Kafka Locally"
tags = ["technology"]
+++

Download the latest version of kafka from apache's website. Make sure to download
the binaries if you want to run it locally. Unzip the contents of the zip file and edit the config/server.properties file.

Set these variables to

    host.name=localhost
    advertised.host.name=localhost

To enable auto-creation and deletion of topics in that same properties file add these properties

    delete.topic.enable=true
    auto.create.topics.enable=true
