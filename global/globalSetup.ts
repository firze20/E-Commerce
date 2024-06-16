import { Express } from 'express';
import createServer from '../app/utils/server';

module.exports = async () => {
  const server: Express = await createServer();
  globalThis.__APP__ = server;
};

