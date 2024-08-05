/* eslint-disable @typescript-eslint/no-var-requires */
const expoesModule = require("../federationModules/federationModules.json");
const deps = require("../../package.json").dependencies;

const federationConfig = {
  name: "application",
  filename: "remoteEntry.js",
  library: { type: "var", name: "application" },
  exposes: expoesModule,
  shared: {
    ...deps,
    react: {
      singleton: true,
      eager: true,
      requiredVersion: deps.react,
    },
    "react-dom": {
      singleton: true,
      requiredVersion: deps["react-dom"],
    },
    "react-router-dom": {
      singleton: true,
      requiredVersion: deps["react-router-dom"],
    }
  },
};

module.exports = federationConfig;
