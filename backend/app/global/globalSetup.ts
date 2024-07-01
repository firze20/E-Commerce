import { Express } from 'express';
import createServer from '../utils/server';

module.exports = async () => {
  const server: Express = await createServer();
  globalThis.__APP__ = server;
};

