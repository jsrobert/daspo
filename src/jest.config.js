// export const preset = 'ts-jest';
// export const testEnvironment = 'node';

export const clearMocks = true;
export const testEnvironment = 'jsdom';
export const testMatch = [
    '<rootDir>/src/**/__tests__/**/*.[jt]s?(x)',
    '<rootDir>/src/**/?(*.)+(spec|test).[tj]s?(x)'
];
export const preset = 'ts-jest';