import { Request, Response } from 'express';
import { ProductService } from '../services/productService';

const productService = new ProductService();

export class ProductController {
  async getAll(req: Request, res: Response) {
    try {
      const filters = {
        category: req.query.category as string,
        minPrice: req.query.minPrice as string,
        maxPrice: req.query.maxPrice as string,
        name: req.query.name as string
      };
      
      const products = await productService.getAllProducts(filters);
      res.json(products);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const product = await productService.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json(product);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const productData = {
        name: req.body.name,
        description: req.body.description,
        price: Number(req.body.price),
        category: req.body.category,
        stock: Number(req.body.stock),
        image: req.file ? `/uploads/${req.file.filename}` : undefined
      };
      
      const product = await productService.createProduct(productData);
      res.status(201).json(product);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const productData = {
        name: req.body.name,
        description: req.body.description,
        price: Number(req.body.price),
        category: req.body.category,
        stock: Number(req.body.stock),
        image: req.file ? `/uploads/${req.file.filename}` : req.body.image
      };
      
      const product = await productService.updateProduct(req.params.id, productData);
      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json(product);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const product = await productService.deleteProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json({ message: 'Producto eliminado exitosamente' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}