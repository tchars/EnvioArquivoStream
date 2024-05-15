import http from "node:http";
import { Database } from "../database.js";
import { middleware } from "../middleware.js";
import { routes } from "../routes.js";
import { randomUUID } from "node:crypto";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await middleware(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    return route.handler(req, res);
  }

  return res.writeHead(404).end();
});

server.listen(3000);
