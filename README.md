# next-node-monitor

## Usage

### Docker Compose

this [`docker-compose.yml`](./docker-compose.yml) will set you up with a running banano node and this project as monitor. Change the environment variables to your liking. You can find more informations about running a banano node in the [`bananocoin/banano` Wiki](https://github.com/BananoCoin/banano/wiki).

```yml
services:
  banano-monitor:
    image: ghcr.io/eulentier161/next-node-monitor:0.1.1
    restart: unless-stopped
    ports:
      - "127.0.0.1:3000:3000"
    environment:
      - "METADATA_NAME=Banano Node Monitor"
      - "METADATA_SHORT_NAME=Eulentiers Node"
      - "METADATA_DESCRIPTION=A Banano Node Monitor from Eulentier"
      - "NODE_REPRESENTATIVE=ban_1hootubxy68fhhrctjmaias148tz91tsse3pq1pgmfedsm3cubhobuihqnxd"
      - "NODE_NAME=Eulentier"
      - "NODE_LOCATION=The Jungle"
      - "NODE_RPC_HOST=banano-node"
      - "NODE_RPC_PORT=7072"
      - "NODE_TCP_PORT=7071"
      - "CACHE_TIME=10"
      - "HEADING_TEXT=<p>This value is injected into the header to the left of the monKey. You can pass any valid HTML here.</p>"
    depends_on:
      - banano-node

  banano-node:
    image: bananocoin/banano:V26.1
    restart: unless-stopped
    ports:
      - "127.0.0.1:7071:7071"
      - "127.0.0.1:7072:7072"
      - "127.0.0.1:7074:7074"
    volumes:
      - ./BananoDockerRoot:/root
    healthcheck:
      test: ["CMD", "curl", "-d", "'{", '"action":"version"', "}'", "http://127.0.0.1:7072"]

networks:
  default:
    driver: bridge
```
