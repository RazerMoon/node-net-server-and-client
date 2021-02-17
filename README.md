# Node.js Net Server and Client

![Example](.media/example.gif)

## Simple Node.js server and client that uses the [Net](https://nodejs.org/api/net.html) module

## Run with Docker

Run a server with Docker by running the following command:

```bash
docker run \
       --rm -p 1337:1337 \
       --env IP_ADDRESS=0.0.0.0 \
       --env MODE=server \
       -d \
       razermoon/nnsc:latest
```

[Here is the Docker repo](https://hub.docker.com/r/razermoon/nnsc)

### If you want to get logs, use the following

```bash
NAME=logs; \
     docker volume create $NAME && \
     MOUNT=$(docker volume inspect $NAME | grep -oP '(?<="Mountpoint": ")[^"]*') && \
     chmod -R 777 $MOUNT
```

Then run server using the following command:

```bash
docker run \
       --rm \
       -p 1337:1337 \
       --volume logs:/home/node/app/logs \
       --env IP_ADDRESS=0.0.0.0 \
       --env MODE=server \
       -d \
       razermoon/nnsc:latest
```

## Build

Compile:

```
yarn compile
```

Start server:

```
yarn server
```

Start client:

```
yarn client
```

Rename the .env.example to .env and fill out the fields for custom ip.

You can also download the lastest release.
