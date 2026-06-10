import type { FastifyReply, FastifyRequest } from "fastify";
import type { CreateCategoryInput } from "../schemas/category-schema.js";
import * as categoryService from "../services/category-service.js";

type CreateCategoryRequest = FastifyRequest<{
  Body: CreateCategoryInput;
}>;

type updateCategoryRequest = FastifyRequest<{
  Params: { id: string };
  Body: CreateCategoryInput;
}>;

export async function createCategory(
  req: CreateCategoryRequest,
  reply: FastifyReply,
) {
  try {
    const category = await categoryService.createCategory(
      req.user.id,
      req.body,
    );

    reply.status(201).send(category);
  } catch (error) {
    console.error("Error creating category:", error);

    reply.status(500).send({ error: "Failed to create category" });
  }
}

export async function updateCategory(
  req: updateCategoryRequest,
  reply: FastifyReply,
) {
  try {
    const category = await categoryService.updateCategory(
      req.params.id,
      req.user.id,
      req.body,
    );

    return reply.status(200).send(category);
  } catch (error) {
    console.error("Error updating category:", error);

    return reply.status(500).send({ error: "Failed to update category" });
  }
}

export async function getCategoriesByUserId(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const categories = await categoryService.getCategoriesByUserId(req.user.id);

    return reply.status(200).send(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return reply.status(500).send({ error: "Failed to fetch categories" });
  }
}

export async function deleteCategory(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  try {
    await categoryService.deleteCategory(req.params.id, req.user.id);

    return reply.status(204).send({ message: "Category deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting category:", error);

    if (
      error.cause?.code === "23001" &&
      error.cause?.message.includes("Transaction_categoryId_fkey")
    ) {
      return reply
        .status(409)
        .send({ error: "Cannot delete category because it is being used" });
    }

    return reply.status(500).send({ error: "Failed to delete category" });
  }
}
