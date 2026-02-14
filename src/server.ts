import express from "express";
import type { Application, Request, Response } from "express";
import routes from  './routes/index.route.js'

export function createServer(): Application {
  const app = express();

  app.use(express.json());

  app.use(routes)


  

  return app;
}
