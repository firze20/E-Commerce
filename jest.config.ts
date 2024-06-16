import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  // globalSetup: './global/setupTests.ts',
  testEnvironment: 'node',
  globalSetup: './global/globalSetup.ts',
  globalTeardown: './global/globalTeardown.ts',
  //setupFilesAfterEnv: ['./global/jest.setup.ts'],
};
export default config;