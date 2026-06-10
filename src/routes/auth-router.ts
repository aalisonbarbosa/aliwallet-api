import { type FastifyInstance } from "fastify";
import * as authController from "../controllers/auth-controller.js";
import { authenticate } from "../middleware/authenticate.js";

export default function authRouter(app: FastifyInstance) {
  app.post("/register", authController.register);
  app.post("/login", authController.login);
}
