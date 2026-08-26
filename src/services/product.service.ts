import ProductModel from "../models/product.model.js";
import type { QueryOptions, UpdateQuery } from "mongoose";
import type { Product } from "../types.js";

const createProduct = async (input: Partial<Product>) => {
  return ProductModel.create(input);
};

const findProduct = async (
  query: Partial<Product>,
  options: QueryOptions = { lean: true },
) => {
  // query is what you use to find the product
  // {}: which fields you want returned. An empty object means "return all fields."
  // contains Mongoose query options.
  return ProductModel.findOne(query, {}, options);
};

const findAndUpdateProduct = async (
  query: Partial<Product>,
  update: UpdateQuery<Product>,
  options: QueryOptions,
) => {
  return ProductModel.findOneAndUpdate(query, update, options);
};

const deleteProduct = async (query: Partial<Product>) => {
  return ProductModel.deleteOne(query);
};

export { createProduct, findProduct, findAndUpdateProduct, deleteProduct };
