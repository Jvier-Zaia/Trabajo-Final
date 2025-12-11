import mongoose, { Schema } from 'mongoose';
import { IProduct } from '../interfaces/Product.interface';

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    image: { type: String }
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>('Product', productSchema);