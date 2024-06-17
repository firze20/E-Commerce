import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  // globalSetup: './global/setupTests.ts',
  testEnvironment: 'node',
  globalSetup: './app/global/globalSetup.ts',
  globalTeardown: './app/global/globalTeardown.ts',
  setupFilesAfterEnv: ['./app/global/jest.setup.ts'],
};
export default config;