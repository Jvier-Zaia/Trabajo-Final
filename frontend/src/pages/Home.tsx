import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({ name: '', category: '', minPrice: '', maxPrice: '' });
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getProducts({
          name: filters.name || undefined,
          category: filters.category || undefined,
          minPrice: filters.minPrice || undefined,
          maxPrice: filters.maxPrice || undefined,
        });
        setProducts(data);
      } catch (e: any) {
        setError(e.message ?? 'Error cargando productos');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filters]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h1>Tienda pública</h1>
      <section className="filters">
        <div style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
          <input
            name="name"
            placeholder="Buscar productos..."
            value={filters.name}
            onChange={handleChange}
            style={{ flex: 1 }}
          />
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            Filtros
          </button>
        </div>
        {showFilters && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
            <select
              name="category"
              value={filters.category}
              onChange={handleChange}
            >
              <option value="">Todas las categorías</option>
              <option value="electronica">Electrónica</option>
              <option value="ropa">Ropa</option>
              <option value="hogar">Hogar</option>
            </select>
            <select
              name="minPrice"
              value={filters.minPrice}
              onChange={handleChange}
            >
              <option value="">Precio mínimo</option>
              <option value="1000">$1.000</option>
              <option value="5000">$5.000</option>
              <option value="10000">$10.000</option>
            </select>
            <select
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleChange}
            >
              <option value="">Precio máximo</option>
              <option value="5000">$5.000</option>
              <option value="10000">$10.000</option>
              <option value="20000">$20.000</option>
            </select>
          </div>
        )}
      </section>

      {loading && <p>Cargando productos...</p>}
      {error && <p className="error">{error}</p>}

      <div className="grid">
        {products.map((p) => (
          <article key={p._id} className="card">
            {p.image && (
              <img
                src={`https://trabajo-final-2flw.onrender.com${p.image}`}
                alt={p.name}
                className="card-image"
              />
            )}
            <h2>{p.name}</h2>
            <p className="price">${p.price}</p>
            <p className="category">{p.category}</p>
            <p className="description">{p.description}</p>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => addToCart(p)}
              >
                Agregar al carrito
              </button>
              <Link to={`/product/${p._id}`} className="btn-primary">
                Ver / Comprar
              </Link>
            </div>
          </article>
        ))}
        {!loading && products.length === 0 && <p>No hay productos que coincidan.</p>}
      </div>
    </div>
  );
};
