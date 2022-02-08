/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  preset: "ts-jest",
  clearMocks: true,
  verbose: true,
};
