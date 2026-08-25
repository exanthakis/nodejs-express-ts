import ProductModel from "@models/product.model.js";
import type { QueryOptions, UpdateQuery } from "mongoose";
import type { Product } from "src/types.js";

const createProduct = async (
  input: Omit<Product, "createdAt" | "updatedAt">,
) => {
  ProductModel.create(input);
};

const findProduct = async (
  query: Product,
  options: QueryOptions = { lean: true },
) => {
  // query is what you use to find the product
  // {}: which fields you want returned. An empty object means "return all fields."
  // contains Mongoose query options.
  return ProductModel.findOne(query, {}, options);
};

const findAndUpdateProduct = async (
  query: Product,
  update: UpdateQuery<Product>,
  options: QueryOptions,
) => {
  return ProductModel.findOneAndUpdate(query, update, options);
};

const deleteProduct = async (query: Product) => {
  return ProductModel.deleteOne(query);
};

export { createProduct, findProduct, findAndUpdateProduct, deleteProduct };
