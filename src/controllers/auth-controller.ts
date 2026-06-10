import { type FastifyReply, type FastifyRequest } from "fastify";
import { loginSchema, registerSchema } from "../schemas/auth-schema.js";
import * as authService from "../services/auth-service.js";

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const parseResult = registerSchema.safeParse(req.body);

  if (!parseResult.success) {
    return reply.status(400).send({ error: "Invalid request body" });
  }

  try {
    const newUser = await authService.register(parseResult.data);

    return reply.status(201).send({ user: newUser });
  } catch (error) {
    console.error(error);

    return reply.status(500).send({ error: "Internal Server Error" });
  }
}

export async function login(req: FastifyRequest, reply: FastifyReply) {
  const parseResult = loginSchema.safeParse(req.body);

  if (!parseResult.success) {
    return reply.status(400).send({ error: "Invalid request body" });
  }

  try {
    const user = await authService.login(parseResult.data);

    const accessToken = await reply.jwtSign(
      {
        id: user.id,
      },
      { expiresIn: "7d" },
    );

    return reply.status(200).send({
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken,
    });
  } catch (error) {
    console.error(error);

    return reply.status(500).send({ error: "Internal Server Error" });
  }
}
