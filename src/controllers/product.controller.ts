import type {
  CreateProductInput,
  DeleteProductInput,
  ReadProductInput,
  UpdateProductInput,
} from "../schema/product.schema.js";
import {
  createProduct,
  deleteProduct,
  findAndUpdateProduct,
  findProduct,
} from "../services/product.service.js";
import type { Request, Response } from "express";
import logger from "../utils/logger.js";
import type { Product } from "src/types.js";

const createProductHandler = async (
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response<Product | string>,
) => {
  try {
    const userId = res.locals.user._id;
    const body = req.body;

    const product = await createProduct({
      ...body,
      user: userId,
    });

    return res.status(201).json(product);
  } catch (e: unknown) {
    logger.error(e);
    return res.status(500).send(e instanceof Error ? e.message : "");
  }
};

const updateProductHandler = async (
  req: Request<UpdateProductInput["params"], {}, UpdateProductInput["body"]>,
  res: Response<Product | string | null>,
) => {
  try {
    const userId = res.locals.user._id;
    const productId = req.params.productId;
    const update = req.body;

    const product = await findProduct({ productId });

    if (!product) {
      return res.sendStatus(404);
    }

    if (String(product.user) !== userId) {
      return res.sendStatus(403);
    }

    const updatedProduct = await findAndUpdateProduct({ productId }, update, {
      new: true,
    });

    return res.send(updatedProduct);
  } catch (e: unknown) {
    logger.error(e);
    return res.status(500).send(e instanceof Error ? e.message : "");
  }
};

const getProductHandler = async (
  req: Request<UpdateProductInput["params"]>,
  res: Response<Product | string>,
) => {
  try {
    const productId = req.params.productId;

    const product = await findProduct({ productId });

    if (!product) {
      return res.sendStatus(404);
    }

    return res.send(product);
  } catch (e: unknown) {
    logger.error(e);
    return res.status(500).send(e instanceof Error ? e.message : "");
  }
};

const deleteProductHandler = async (
  req: Request<DeleteProductInput["params"]>,
  res: Response<Product | string>,
) => {
  try {
    const userId = res.locals.user._id;
    const productId = req.params.productId;

    const product = await findProduct({ productId });

    if (!product) {
      return res.sendStatus(404);
    }

    if (String(product.user) !== userId) {
      return res.sendStatus(403);
    }

    await deleteProduct({ productId });

    return res.sendStatus(200);
  } catch (e: unknown) {
    logger.error(e);
    return res.status(500).send(e instanceof Error ? e.message : "");
  }
};

export {
  createProductHandler,
  updateProductHandler,
  getProductHandler,
  deleteProductHandler,
};
