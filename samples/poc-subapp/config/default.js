"use strict";

const defaultListenPort = 3000;

const portFromEnv = () => {
  const x = parseInt(process.env.APP_SERVER_PORT || process.env.PORT, 10);
  /* istanbul ignore next */
  return x !== null && !isNaN(x) ? x : defaultListenPort;
};

module.exports = {
  plugins: {
    "electrode-archetype-react-app-dev": {
      enable: process.env.WEBPACK_DEV_MIDDLEWARE === "true" && process.env.WEBPACK_DEV === "true"
    },
    inert: {
      enable: true
    },
    electrodeStaticPaths: {
      enable: true,
      options: {
        pathPrefix: "dist"
      }
    },
    "subapp-server": { options: { insertTokenIds: true } }
  },
  connections: {
    default: {
      host: process.env.HOST,
      address: process.env.HOST_IP || "0.0.0.0",
      port: portFromEnv(),
      routes: {
        cors: false
      },
      state: {
        ignoreErrors: true
      }
    }
  }
};
