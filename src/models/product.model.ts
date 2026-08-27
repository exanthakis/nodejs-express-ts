import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';
import type { Product } from '../types.ts';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      default: () => `product_${nanoid()}`,
    },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model<Product>('Product', productSchema);

export default ProductModel;
