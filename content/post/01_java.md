+++
date = "2015-10-14T17:43:46-04:00"
draft = true
title = "Programming - How to re-run completed spring batch jobs"
tags = ["java"]
+++

While working with spring batch my team noticed that we couldn't resubmit completed jobs even thought the params were different due to a spring batch feature not allowing non unique jobs to reprocesses after completion. In searching for an answer I stumbled upon this [Spring Forum Post](http://forum.spring.io/forum/spring-projects/batch/102028-job-restartability-v-job-rerunnability). The details provided work although we still had to pass in a run id in our rest call since we are submitting job via rest API. So rather than specifying a run id each time we instead overrode the RunIdIncrementer class' getNext() method to just return a new Date() long each time. The code below provides a working solution.

### Xml
    <bean id ="incrementer" class ="com.company.app.batch.util.RunIdIncrementer">
        <property name="key" value="processedDttm"/>
    </bean>

    <batch:job id="nameOfJob" incrementer="incrementer" restartable="false">
    ...
    </batch>

### Java
    import org.springframework.batch.core.JobParameters;
    import org.springframework.batch.core.JobParametersBuilder;
    import org.springframework.batch.core.JobParametersIncrementer;

    import java.util.Date;

    public class RunIdIncrementer implements JobParametersIncrementer {
        private static String RUN_ID_KEY = "run.id";
        private String key;

        public RunIdIncrementer() {
            this.key = RUN_ID_KEY;
        }

        public void setKey(String key) {
            this.key = key;
        }

        public JobParameters getNext(JobParameters parameters) {
            JobParameters params = parameters == null?new JobParameters():parameters;
            long id = new Date().getTime();
            return (new JobParametersBuilder(params)).addLong(this.key, Long.valueOf(id)).toJobParameters();
        }
    }
