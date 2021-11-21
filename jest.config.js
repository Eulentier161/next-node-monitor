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
        '@styles/(.*)': '<rootDir>/styles/$1',
        '@components/(.*)': '<rootDir>/components/$1',
        '@config': '<rootDir>/config.ts',
        '@helper/(.*)': '<rootDir>/helper/$1',
        '@public/(.*)': '<rootDir>/public/$1',
    },
    setupFilesAfterEnv: ['./tests/jest.setup.ts'],
};
