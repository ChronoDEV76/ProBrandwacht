import type { Config } from 'jest'

const config: Config = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(t|j)sx?$': ['ts-jest', { tsconfig: 'tsconfig.json', useESM: true }],
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  setupFilesAfterEnv: ['<rootDir>/vitest.setup.ts'],
  collectCoverageFrom: ['{app,components,lib}/**/*.{ts,tsx}', '!**/*.d.ts'],
}

export default config

