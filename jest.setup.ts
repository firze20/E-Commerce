jest.setTimeout(30000); // Increase the timeout for all tests to 30 seconds

beforeAll(async () => {
  // Perform any global setup here
  // For example, you might want to initialize some global state or log something
  console.log("Running global setup before all tests...");
  
  // Simulate an async operation if needed
  await new Promise(resolve => setTimeout(resolve, 10000));
});
