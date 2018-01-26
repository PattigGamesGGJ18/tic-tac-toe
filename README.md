# PattigGames tic-tac-toe

This is a Tic-Tac-Toe browser game based on boardgame.io.

## How to start developing?

Install all required dependencies by running

```
$ npm install
```

Now you can serve a development build that automatically updates when your code changes by running

```
$ npm start
```

## How do I create a production build?

To create a production build without debugging information run

```
$ npm run build
```

This will create a production build inside the `dist` folder. The production build can be executed by running

```
$ cd dist
$ node server.js
```

This will launch a `koa` server.

## How to deploy this browser game with Docker?

First, you have to build the docker image for this application. You can do this by running

```
$ make build
```

To start the docker container run

```
$ make run
```

The image will be named `tic-tac-toe` and you can integrate it easily into your docker stack/docker-compose setup:

```yaml
services:
  tic-tac-toe:
    image: tic-tac-toe
    restart: unless-stopped
    ports:
      - 80:8000
```
