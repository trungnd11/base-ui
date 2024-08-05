import type { StorybookConfig } from "@storybook/react-webpack5";
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
import configWebpack from "../webpack.config.js";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  core: {
    builder: {
      name: '@storybook/builder-webpack5',
      options: {
        fsCache: true,
        lazyCompilation: true,
      },
    },
  },
  swc: () => ({
    jsc: {
      transform: {
        react: {
          runtime: "automatic"
        }
      }
    }
  }),
  docs: {
    autodocs: "tag",
  },
  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript"
  },
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.plugins = [
        ...(config.resolve.plugins || []),
        new TsconfigPathsPlugin({
          extensions: config.resolve.extensions
        }),
      ];
    }

    // if (config.module?.rules) {
    //   return {
    //     ...config,
    //     module: { ...config.module, rules: [...config.module.rules, ...configWebpack().module.rules] },
    //   };
    // }
    return config;
  }
};
export default config;
