import '@testing-library/jest-dom';

// Mock fetch before all tests
beforeAll(() => {
  global.fetch = vi.fn();
});

// Clear call history after each test
afterEach(() => {
  vi.clearAllMocks();
});