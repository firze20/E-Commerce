import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  globalSetup: './app/global/setupTests.ts',
  globalTeardown: './app/global/tearDownTests.ts',
  setupFilesAfterEnv: ['./jest.setup.ts']
};
export default config;