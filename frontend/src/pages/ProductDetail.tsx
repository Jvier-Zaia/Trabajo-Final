import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/api';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';

export const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (e: any) {
        setError(e.message ?? 'Error cargando producto');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!product) return <p>Producto no encontrado</p>;

  return (
    <div className="detail detail-card">
      {product.image && (
        <img
          src={`https://trabajo-final-2flw.onrender.com${product.image}`}
          alt={product.name}
          className="detail-image"
        />
      )}
      <div className="detail-info">
        <h1>{product.name}</h1>
        <p className="price">${product.price}</p>
        <p className="category">Categoría: {product.category}</p>
        <p className="description">{product.description}</p>
        <p>Stock disponible: {product.stock}</p>
        <div style={{ marginTop: '1rem' }}>
          <button
            type="button"
            className="btn-primary"
            onClick={() => addToCart(product)}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};
