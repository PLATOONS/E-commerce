import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',

  testPathIgnorePatterns: [
    '<rootDir>/e2e/',
    '<rootDir>/.next/',
  ],
  modulePathIgnorePatterns: ['<rootDir>/.next/'],
  watchPathIgnorePatterns: ['<rootDir>/.next/'],
}
export default createJestConfig(config)
