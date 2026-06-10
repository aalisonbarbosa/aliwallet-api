import type { FastifyInstance } from "fastify";
import * as categoryController from "../controllers/category-controller.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../schemas/category-schema.js";

export default async function categoryRouter(app: FastifyInstance) {
  app.post(
    "/categories",
    {
      schema: {
        body: createCategorySchema,
      },
    },
    categoryController.createCategory,
  );

  app.put(
    "/categories/:id",
    {
      schema: {
        body: updateCategorySchema,
      },
    },
    categoryController.updateCategory,
  );

  app.get("/categories", categoryController.getCategoriesByUserId);

  app.delete("/categories/:id", categoryController.deleteCategory);
}
