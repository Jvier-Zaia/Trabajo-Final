import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteProduct, getProducts, updateProduct } from '../services/api';
import type { Product } from '../types';
import { Modal } from '../components/Modal';

export const DashboardProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<Product | null>(null);
  const navigate = useNavigate();

  const load = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (e: any) {
      setError(e.message ?? 'Error cargando productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openEdit = (product: Product) => {
    setEditing(product);
    setEditError(null);
  };

  const closeEdit = () => {
    setEditing(null);
    setEditError(null);
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editing) return;

    try {
      setSaving(true);
      setEditError(null);

      const formData = new FormData(e.currentTarget);
      const data = new FormData();
      data.append('name', String(formData.get('name') ?? ''));
      data.append('description', String(formData.get('description') ?? ''));
      data.append('price', String(formData.get('price') ?? ''));
      data.append('category', String(formData.get('category') ?? ''));
      data.append('stock', String(formData.get('stock') ?? ''));

      const imageFile = (formData.get('image') as File | null) ?? null;
      if (imageFile && imageFile.size > 0) {
        data.append('image', imageFile);
      } else if (editing.image) {
        data.append('image', editing.image);
      }

      await updateProduct(editing._id, data);
      await load();
      closeEdit();
    } catch (e: any) {
      setEditError(e.response?.data?.error ?? e.message ?? 'Error actualizando producto');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const product = products.find((p) => p._id === id) || null;
    setDeleting(product);
  };

  return (
    <div>
      <h1>Mis productos</h1>
      <button
        type="button"
        className="btn-primary"
        onClick={() => navigate('/dashboard/products/new')}
      >
        Nuevo producto
      </button>

      {loading && <p>Cargando...</p>}
      {error && <p className="error">{error}</p>}

      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>{p.category}</td>
              <td>{p.stock}</td>
              <td>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => openEdit(p)}
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="btn-danger"
                  onClick={() => handleDelete(p._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {!loading && products.length === 0 && (
            <tr>
              <td colSpan={5}>No hay productos</td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal
        open={Boolean(deleting)}
        title={deleting ? `Eliminar ${deleting.name}` : ''}
        onClose={() => setDeleting(null)}
      >
        {deleting && (
          <div className="product-form">
            <p>
              ¿Seguro que deseas eliminar este producto? Esta acción no se puede deshacer.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <button
                type="button"
                className="btn-danger"
                onClick={async () => {
                  try {
                    await deleteProduct(deleting._id);
                    await load();
                    setDeleting(null);
                  } catch (e: any) {
                    alert(
                      e.response?.data?.error ?? e.message ?? 'Error eliminando producto',
                    );
                  }
                }}
              >
                Sí, eliminar
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setDeleting(null)}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={Boolean(editing)}
        title={editing ? `Editar ${editing.name}` : ''}
        onClose={closeEdit}
      >
        {editing && (
          <form onSubmit={handleEditSubmit} className="product-form">
            <label>
              Nombre
              <input name="name" defaultValue={editing.name} required />
            </label>
            <label>
              Descripción
              <textarea
                name="description"
                defaultValue={editing.description}
                required
              />
            </label>
            <label>
              Precio
              <input
                type="number"
                step="0.01"
                name="price"
                defaultValue={editing.price}
                required
              />
            </label>
            <label>
              Categoría
              <input name="category" defaultValue={editing.category} required />
            </label>
            <label>
              Stock
              <input
                type="number"
                name="stock"
                defaultValue={editing.stock}
                required
              />
            </label>
            <label>
              Imagen
              <input type="file" name="image" accept="image/*" />
            </label>
            {editing.image && (
              <div className="current-image">
                <p>Imagen actual:</p>
                <img
                  src={`http://localhost:4444${editing.image}`}
                  alt="Actual"
                  className="detail-image"
                />
              </div>
            )}
            {editError && <p className="error">{editError}</p>}
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
};
