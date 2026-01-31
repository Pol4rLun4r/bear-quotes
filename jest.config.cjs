const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  clearMocks: true,
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {
      useESM: true,
      tsconfig: {
        module: "ESNext",
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
      }
    }],
    "^.+\\.jsx?$": ["ts-jest", {
      useESM: true,
      tsconfig: {
        module: "ESNext",
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
      }
    }],
  },
};