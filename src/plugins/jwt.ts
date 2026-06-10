import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import {type FastifyInstance } from "fastify";
import fp from "fastify-plugin";

export default fp(async function (app: FastifyInstance) {
  app.register(fastifyCookie);

  app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET!,
    cookie: {
      cookieName: "token",
      signed: false,
    },
  });
});
