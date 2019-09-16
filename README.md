# docker-log-watch

## BackGround
This project will demonstrate a log forwarding on a given pipeline container.
The consists of 3 main folders:

* demo_pipeline - This folder conists of demo pipeline step container that will be launched and monitored.
* log.watcher - The main service that will be launching the container and monitor its log upon HTTP trigger.
* demo_client - This is a CLI client that will trigger the request to the log.watcher service.

## Installation

To setup the demo you will need to do the following steps:

1. Prepare the demo image:
```bash
cd demo_pipeline
docker build -t pipeline_mock:latest .
```

2. Install the service dependencies

```bash
cd log.watcher
npm install
```

3. Compile the service

```bash
node ./node_modules/typescript/bin/tsc 
```

4. Launch the service

```bash
node ./src/app.js
```

On a separate terminal you should do the following:

5. Install the CLI client dependencies

```bash
cd demo_client
npm install
```

6. Compile the CLI client

```bash
node ./node_modules/typescript/bin/tsc 
```
7. Launch the CLI Client

```bash
node ./src/index.js
```


## Cleanup
Normally when exiting the service it will clean all the container that he has launched.
in case this is not the case just manually kill the containers by first running the following:

```bash
docker ps | grep pipe
```
Upon each container perform:

```bash
docker kill <CONTAINER ID>
```


