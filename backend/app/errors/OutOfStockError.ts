/**
 * Custom error class representing an out-of-stock error.
 */
class OutOfStockError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "OutOfStockError";
    }
  }

export default OutOfStockError;