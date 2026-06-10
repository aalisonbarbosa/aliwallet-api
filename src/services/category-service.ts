import * as categoryRepository from "../repositores/category-repository.js";
import type {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../schemas/category-schema.js";

export async function createCategory(
  userId: string,
  data: CreateCategoryInput,
) {
  return categoryRepository.createCategory(userId, data);
}

export async function updateCategory(
  productId: string,
  userId: string,
  data: UpdateCategoryInput,
) {
  return categoryRepository.updateCategory(productId, userId, data);
}

export async function getCategoriesByUserId(userId: string) {
  return categoryRepository.findAllCategoriesByUserId(userId);
}

export async function deleteCategory(categoryId: string, userId: string) {
  return categoryRepository.deleteCategory(categoryId, userId);
}
