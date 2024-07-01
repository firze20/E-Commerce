import { createClient } from 'redis';
import logger from './logger';

// Create a new Redis client
const client = createClient({
  socket: {
    host: 'redis', // docker-compose service name
    port: 6379, // default Redis port
  },
});

// Handle Redis client errors
client.on('error', (err) => {
  logger.error(`Redis error: ${err}`);
});

// Connect to the Redis server
client.connect().catch((err) => logger.error(`Redis connection error: ${err}`));

// Async function to get a value from Redis
const getAsync = async (key: string): Promise<string | null> => {
  return await client.get(key);
};

// Async function to set a value in Redis with an expiration time
const setAsync = async (key: string, value: string, expirationTime: number): Promise<string | null> => {
  return await client.set(key, value, {
    EX: expirationTime,
  });
};

export { client, getAsync, setAsync };