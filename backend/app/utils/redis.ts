import redis from "redis";
import logger from "./logger";

// Create Redis Client
const client = redis.createClient({
  socket: {
    host: "redis", // docker-compose service name
    port: 6379,
  },
});

// Event Listenner for Redis Client
client.on("error", (err) => {
  logger.error(`Redis error: ${err}`);
});

// Connect the redis server
client.connect();

// Asynchronous function to get a value by key from Redis
const getAsync = async (key: string) => {
  return await client.get(key);
};

// Asynchronous function to set a key-value pair in Redis with an expiration time
const setAsync = async (key: string, value: string, expirationTime: number) => {
  return await client.set(key, value, {
    EX: expirationTime,
  });
};

// Export the Redis client and the asynchronous get and set functions
export { client, getAsync, setAsync}