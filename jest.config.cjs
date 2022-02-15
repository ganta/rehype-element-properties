/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  // TODO: If ts-jest supports ES modules, stop using ts-babel.
  // https://kulshekhar.github.io/ts-jest/docs/next/guides/esm-support/
  transform: {
    "\\.jsx?$": "babel-jest",
    "\\.tsx?$": "ts-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!unified)/.+\\.js"],
  clearMocks: true,
  verbose: true,
};
