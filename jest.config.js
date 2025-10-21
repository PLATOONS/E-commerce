/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest/presets/js-with-ts', // handles TS + JSX/TSX
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    transformIgnorePatterns: ['/node_modules/'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    testPathIgnorePatterns: ['/node_modules/', '/.next/'],
};
