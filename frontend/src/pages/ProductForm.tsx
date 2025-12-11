import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, getProductById, updateProduct } from '../services/api';
import type { Product } from '../types';

export const ProductForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!isEdit || !id) return;
      try {
        setLoading(true);
        const p: Product = await getProductById(id);
        setForm({
          name: p.name,
          description: p.description,
          price: String(p.price),
          category: p.category,
          stock: String(p.stock),
        });
        setExistingImage(p.image);
      } catch (e: any) {
        setError(e.message ?? 'Error cargando producto');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const data = new FormData();
      data.append('name', form.name);
      data.append('description', form.description);
      data.append('price', form.price);
      data.append('category', form.category);
      data.append('stock', form.stock);
      if (imageFile) {
        data.append('image', imageFile);
      } else if (existingImage) {
        data.append('image', existingImage);
      }

      if (isEdit && id) {
        await updateProduct(id, data);
      } else {
        await createProduct(data);
      }

      navigate('/dashboard/products');
    } catch (e: any) {
      setError(e.response?.data?.error ?? e.message ?? 'Error guardando producto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-form">
      <h1>{isEdit ? 'Editar producto' : 'Nuevo producto'}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Descripción
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Precio
          <input
            type="number"
            step="0.01"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Categoría
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Stock
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Imagen
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
        {existingImage && !imageFile && (
          <div className="current-image">
            <p>Imagen actual:</p>
            <img
              src={`http://localhost:4444${existingImage}`}
              alt="Actual"
              className="detail-image"
            />
          </div>
        )}
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </form>
    </div>
  );
};
