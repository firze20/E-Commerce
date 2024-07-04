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

// Async function to delete a value from Redis
const delAsync = async (key: string): Promise<number> => {
  return await client.del(key);
};

// Async delete keys by pattern from Redis

const deleteKeysByPattern = async (pattern: string): Promise<void> => {
  let globalCursor = '0';


  do {
    const reply = await client.scan(Number(globalCursor), {
      MATCH: pattern,
      COUNT: 100,
    });
    const { cursor, keys } = reply;
    globalCursor = cursor.toString();

    if (keys.length > 0) {
      const multi = client.multi();
      keys.forEach((key: any) => multi.del(key));
      await multi.exec();
    }
  } while (globalCursor !== '0');
};


export { client, getAsync, setAsync, delAsync, deleteKeysByPattern };