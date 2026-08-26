import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  updateProductHandler,
} from "@controllers/product.controller.js";
import { requireUser } from "@middleware/requireUser.js";
import validateResource from "@middleware/validateResource.js";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "@schema/product.schema.js";
import express from "express";

const router = express.Router();

router.post(
  "/",
  requireUser,
  validateResource(createProductSchema),
  createProductHandler,
);

router.put(
  "/:productId",
  [requireUser, validateResource(updateProductSchema)],
  updateProductHandler,
);

router.get(
  "/:productId",
  validateResource(getProductSchema),
  getProductHandler,
);

router.delete(
  "/:productId",
  [requireUser, validateResource(deleteProductSchema)],
  deleteProductHandler,
);

export default router;
