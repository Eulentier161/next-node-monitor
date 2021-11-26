<p align="center">
    <a href="https://threema.id/NTFCTHPY">
        <img src="https://img.shields.io/badge/Threema-NTFCTHPY-green" />
    </a>
    <a href="https://github.com/Eulentier161/next-node-monitor/blob/main/LICENSE">
        <img src="https://img.shields.io/github/license/Eulentier161/next-node-monitor" />
    </a>
    <img src="https://img.shields.io/github/languages/code-size/Eulentier161/next-node-monitor" />
    <a href="https://github.com/Eulentier161/next-node-monitor/actions/workflows/node.js.yml">
        <img src="https://github.com/Eulentier161/next-node-monitor/actions/workflows/node.js.yml/badge.svg">
    </a>
</p>
<hr />

This is a replica of [nanoNodeMonitor](https://github.com/NanoTools/nanoNodeMonitor) written in [TypeScript](https://github.com/microsoft/TypeScript) and [Next.js](https://github.com/vercel/next.js).\
Instead of [creeper.banano.cc](https://creeper.banano.cc) it redirects to [yellowspyglass.com](https://yellowspyglass.com).\
This monitor is build with [Banano](https://banano.cc/) instead of [Nano](https://nano.org/) in mind.

# run this project

-   clone this project
-   install [Node.js](https://nodejs.org/en/)^16.x
-   install all dependecies

```console
git clone https://github.com/Eulentier161/next-node-monitor
cd next-node-monitor
npm ci
```

-   edit `.env`
-   if you want to change the themes, edit the variables on top of `styles/globals.scss`

## "i just want a new running banano node + monitor"

-   install [docker](https://docs.docker.com/get-docker/) and [docker-compose](https://docs.docker.com/compose/install/)
-   run

```console
docker-compose up -d
```

-   visit your monitor on port 3000 :)
-   if you want to edit the node configuration look inside `/root/BananoData` and follow instructions on the [official wiki page](https://github.com/BananoCoin/banano/wiki/Building-a-Bananode-from-sources#config-nodetoml) of the banano node or read the [nano documentation](https://docs.nano.org/running-a-node/configuration/)

## "i want standalone monitor for my existing banano node"

### run with node.js

-   to start a debugging server run

```console
npm run dev
```

-   to run a production build run

```console
npm run build
npm run start
```

### run with docker

-   install [docker](https://docs.docker.com/get-docker/)

```console
docker build . -t next-node-monitor
docker run -d --name next-node-monitor next-node-monitor
```

-   after you pulled an update or made changes to this monitor you'll need to re-build the monitor image and restart or run it

```console
docker build . -t "next-node-monitor"
docker restart next-node-monitor || docker run -d --name next-node-monitor next-node-monitor
```

-   make sure to remove dangling images once in a while if you dont have endless storage
