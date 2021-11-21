<p align="center">
    <a href="https://threema.id/NTFCTHPY">
        <img src="https://img.shields.io/badge/Threema-NTFCTHPY-green" alt="Threema" />
    </a>
</p>
<hr />

This is a replica of [nanoNodeMonitor](https://github.com/NanoTools/nanoNodeMonitor) written in [TypeScript](https://github.com/microsoft/TypeScript) and [Next.js](https://github.com/vercel/next.js).\
Instead of [creeper.banano.cc](https://creeper.banano.cc) it redirects to [yellowspyglass.com](https://yellowspyglass.com).\
This monitor is build with [Banano](https://banano.cc/) instead of [Nano](https://nano.org/) in mind.

# run this project

-   clone this project
-   run `npm i` inside this projects directory
-   edit `config.ts`
-   if you want to change the themes, edit the theme variables on top of `styles/globals.scss` or try to decipher my awful scss code in `styles/*`
-   run `npm run dev` to start a debugging server
## run with nodejs server
-   run `npm run build && npm run start` to create an optimized production build and run it
## run inside docker
-   run `docker build . -t next-node-monitor && docker run next-node-monitor`\
the docker setup could need some proper config to make this less annoying for people who want to use it. if you know stuff about docker feel free to help me out.
