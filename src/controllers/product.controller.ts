import type {
  CreateProductInput,
  DeleteProductInput,
  ReadProductInput,
  UpdateProductInput,
} from "@schema/product.schema.js";
import {
  createProduct,
  deleteProduct,
  findAndUpdateProduct,
  findProduct,
} from "@services/product.service.js";
import type { Request, Response } from "express";
import logger from "@utils/logger.js";

const createProductHandler = async (
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response,
) => {
  const userId = res.locals.user._id;
  const body = req.body;

  try {
    const product = await createProduct({ ...body, user: userId });
    return res.status(201).json(product);
  } catch (e: unknown) {
    logger.error(e);
    return res.status(409).send(e instanceof Error ? e?.message : "");
  }
};

const updateProductHandler = async (
  req: Request<UpdateProductInput["params"]>,
  res: Response,
) => {
  const userId = res.locals.user._id;
  const productId = req.params.productId;
  const update = req.body;

  const product = await findProduct({ productId });

  if (!product) {
    return res.sendStatus(404);
  }

  if (product.user !== userId) {
    return res.sendStatus(403);
  }

  const updatedProduct = await findAndUpdateProduct({ productId }, update, {
    new: true,
  });

  return res.send(updatedProduct);
};

const getProductHandler = async (
  req: Request<UpdateProductInput["params"]>,
  res: Response,
) => {
  const productId = req.params.productId;

  const product = await findProduct({ productId });

  if (!product) {
    return res.sendStatus(404);
  }

  return res.send(product);
};

const deleteProductHandler = async (
  req: Request<DeleteProductInput["params"]>,
  res: Response,
) => {
  const userId = res.locals.user._id;
  const productId = req.params.productId;

  const product = await findProduct({ productId });

  if (!product) {
    return res.sendStatus(404);
  }

  if (product.user !== userId) {
    return res.sendStatus(403);
  }

  await deleteProduct({ productId });

  return res.sendStatus(200);
};

export {
  createProductHandler,
  updateProductHandler,
  getProductHandler,
  deleteProductHandler,
};
