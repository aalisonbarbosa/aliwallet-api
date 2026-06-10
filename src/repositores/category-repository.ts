import { prisma } from "../lib/prisma.js";
import type {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../schemas/category-schema.js";

export async function createCategory(
  userId: string,
  data: CreateCategoryInput,
) {
  return prisma.category.create({
    data: {
      ...data,
      userId,
    },
  });
}

export async function updateCategory(
  productId: string,
  userId: string,
  data: UpdateCategoryInput,
) {
  return prisma.category.update({
    where: {
      id: productId,
      userId,
    },
    data,
  });
}

export async function findAllCategoriesByUserId(userId: string) {
  return prisma.category.findMany({
    where: {
      userId,
    },
  });
}

export async function deleteCategory(categoryId: string, userId: string) {
  return prisma.category.delete({
    where: {
      id: categoryId,
      userId,
    },
  });
}
