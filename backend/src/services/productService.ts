import { Product } from '../models/Product';
import { IProduct } from '../interfaces/Product.interface';

export class ProductService {
  async getAllProducts(filters: any) {
    const query: any = {};

    if (filters.category) {
      query.category = filters.category;
    }

    if (filters.minPrice || filters.maxPrice) {
      query.price = {};
      if (filters.minPrice) query.price.$gte = Number(filters.minPrice);
      if (filters.maxPrice) query.price.$lte = Number(filters.maxPrice);
    }

    if (filters.name) {
      query.name = { $regex: filters.name, $options: 'i' };
    }

    return await Product.find(query);
  }

  async getProductById(id: string) {
    return await Product.findById(id);
  }

  async createProduct(productData: IProduct) {
    const product = new Product(productData);
    return await product.save();
  }

  async updateProduct(id: string, productData: Partial<IProduct>) {
    return await Product.findByIdAndUpdate(id, productData, { new: true });
  }

  async deleteProduct(id: string) {
    return await Product.findByIdAndDelete(id);
  }
}