import { Request, Response, NextFunction } from 'express';

export const validateProduct = (req: Request, res: Response, next: NextFunction) => {
  const { name, description, price, category, stock } = req.body;

  const parsedPrice = price !== undefined ? Number(price) : undefined;
  const parsedStock = stock !== undefined && stock !== '' ? Number(stock) : undefined;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ error: 'El nombre es requerido y debe ser un string válido' });
  }

  if (!description || typeof description !== 'string' || description.trim().length === 0) {
    return res.status(400).json({ error: 'La descripción es requerida y debe ser un string válido' });
  }

  if (parsedPrice === undefined || Number.isNaN(parsedPrice) || parsedPrice <= 0) {
    return res.status(400).json({ error: 'El precio es requerido y debe ser un número mayor a 0' });
  }

  if (!category || typeof category !== 'string' || category.trim().length === 0) {
    return res.status(400).json({ error: 'La categoría es requerida y debe ser un string válido' });
  }

  if (parsedStock !== undefined && (Number.isNaN(parsedStock) || parsedStock < 0)) {
    return res.status(400).json({ error: 'El stock debe ser un número mayor o igual a 0' });
  }

  // Normalizar en el body para el resto de la cadena
  (req.body as any).price = parsedPrice;
  if (parsedStock !== undefined) {
    (req.body as any).stock = parsedStock;
  }

  next();
};