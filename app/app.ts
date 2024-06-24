import logger from "./utils/logger";
import createServer from "./utils/server";
import swaggerDocs from "./utils/swagger";
import cluster from "cluster";
import os from "os";

const numCpus = os.cpus().length;
const port = Number(process.env.PORT) || 3000;

if (cluster.isPrimary) {
  logger.info(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCpus; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    logger.info(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
    logger.info('Starting a new worker');
    cluster.fork();
  });
} else {
  // Workers can share any TCP connection
  // In this case, it is an HTTP server
  (async () => {
    try {
      const app = await createServer();
      app.listen(port, () => {
        logger.info(`Worker ${process.pid} started: Server running on port ${port}`);
        swaggerDocs(app, port);
      });
    } catch (error) {
      logger.error('Error starting the server:', error);
      process.exit(1);
    }
  })();
}