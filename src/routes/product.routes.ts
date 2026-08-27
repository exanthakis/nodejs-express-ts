import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  updateProductHandler,
} from "../controllers/product.controller.ts";
import { requireUser } from "../middleware/requireUser.ts";
import validateResource from "../middleware/validateResource.ts";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "../schema/product.schema.ts";
import express, { Router } from "express";

const productRouter: Router = express.Router();

productRouter.post(
  "/",
  requireUser,
  validateResource(createProductSchema),
  createProductHandler,
);

productRouter.put(
  "/:productId",
  [requireUser, validateResource(updateProductSchema)],
  updateProductHandler,
);

productRouter.get(
  "/:productId",
  validateResource(getProductSchema),
  getProductHandler,
);

productRouter.delete(
  "/:productId",
  [requireUser, validateResource(deleteProductSchema)],
  deleteProductHandler,
);

export default productRouter;
