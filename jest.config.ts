import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  globalSetup: './global/setupTests.ts',
  globalTeardown: './global/tearDownTests.ts',
  //setupFilesAfterEnv: ['./jest.setup.ts']
};
export default config;