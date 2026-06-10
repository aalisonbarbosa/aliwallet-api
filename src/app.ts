import "dotenv/config.js";
import Fastify from "fastify";
import jwt from "./plugins/jwt.js";
import authRouter from "./routes/auth-router.js";
import { authenticate } from "./middleware/authenticate.js";
import transactionRouter from "./routes/transaction-router.js";
import { validatorCompiler } from "fastify-type-provider-zod";
import categoryRouter from "./routes/category-router.js";
import cors from "@fastify/cors";

const app = Fastify();

await app.register(cors, {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

app.setValidatorCompiler(validatorCompiler);
// app.setSerializerCompiler(serializerCompiler);

app.register(jwt);

app.register(authRouter);

app.register(async (app) => {
  app.addHook("onRequest", authenticate);

  app.register(transactionRouter);
  app.register(categoryRouter);
});

app.listen({ port: 8080, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`);
});
