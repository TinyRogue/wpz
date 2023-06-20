import type { Config } from '@jest/types';

const jestConfig = async (): Promise<Config.InitialOptions> => {
  return {
    verbose: true,
    testEnvironment: 'jest-environment-jsdom',
    testRegex: ['.*\\.spec\\.ts$', '.*\\.spec\\.tsx$'],
    preset: 'ts-jest',
    coverageThreshold: {
      global: {
        statements: 60,
        branches: 60,
        functions: 60,
        lines: 60,
      },
    },
    coverageDirectory: '../coverage',
    globals: {
      'ts-jest': {
        tsconfig: './tsconfig.jest.json',
      },
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '<rootDir>/assetsTransformer.js',
      '\\.(css|less)$': '<rootDir>/assetsTransformer.js',
    },
  };
};

export default jestConfig;
