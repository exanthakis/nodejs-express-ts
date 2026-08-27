import { object, string, number, z } from 'zod';

const payload = {
  body: object({
    title: string({ error: 'Title is required' }),
    description: string({ error: 'Description is required' }).min(
      120,
      'Description should be at least 120 characters long'
    ),
    price: number({ error: 'Price is required' }),
    image: string({ error: 'Image is required' }),
  }),
};

const params = {
  params: object({
    productId: string({ error: 'productId is required' }),
  }),
};

const createProductSchema = object({ ...payload });
const updateProductSchema = object({ ...payload, ...params });
const deleteProductSchema = object({ ...params });
const getProductSchema = object({ ...params });

export {
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
  getProductSchema,
};

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type ReadProductInput = z.infer<typeof getProductSchema>;
export type DeleteProductInput = z.infer<typeof deleteProductSchema>;
