/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    globals: {
        'ts-jest': {
            tsconfig: './tsconfig.jest.json',
        },
    },
    moduleNameMapper: {
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
        '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
        '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': '<rootDir>/__mocks__/fileMock.js',
        '@components': '<rootDir>/components/',
        '@config': '<rootDir>/config.ts',
        '@helper/(.*)': '<rootDir>/helper/$1',
        '@public/(.*)': '<rootDir>/public/$1',
    },
    setupFilesAfterEnv: ['./tests/jest.setup.ts'],
};
