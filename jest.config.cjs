/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.{test,spec}.{ts,tsx}'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
    // Worker-using infrastructure modules use `import.meta.url`, which Webpack
    // rewrites but babel-jest doesn't. Each capability provides a Jest manual
    // mock at `infrastructure/__mocks__/timer-worker-manager.ts` that satisfies
    // the ITimerWorker port.
    '^(\\.{1,2}/)+infrastructure/timer-worker-manager$':
      '<rootDir>/src/capabilities/pomodoro/infrastructure/__mocks__/timer-worker-manager.ts',
  },
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
};
