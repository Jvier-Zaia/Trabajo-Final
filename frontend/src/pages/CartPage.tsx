import { useCart } from '../context/CartContext';

export const CartPage = () => {
  const { items, totalAmount, clearCart, removeFromCart } = useCart();

  return (
    <div>
      <h1>Tu carrito</h1>
      {items.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div className="cart-page">
          <ul className="cart-list">
            {items.map((item) => (
              <li key={item.product._id} className="cart-item">
                <div>
                  <strong>{item.product.name}</strong>
                  <div className="cart-item-meta">
                    x{item.quantity} · ${item.product.price}
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-link"
                  onClick={() => removeFromCart(item.product._id)}
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-footer">
            <span>Total: ${totalAmount.toFixed(2)}</span>
            <div className="cart-footer-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={clearCart}
              >
                Vaciar
              </button>
              <button type="button" className="btn-primary">
                Finalizar compra
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
