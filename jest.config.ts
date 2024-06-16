import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  // globalSetup: './global/setupTests.ts',
  testEnvironment: 'node',
  // globalTeardown: './global/tearDownTests.ts',
  setupFilesAfterEnv: ['./global/jest.setup.ts'],
};
export default config;