import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          Tienda Pública
        </Link>
      </div>
      <nav className="navbar-right">
        <Link to="/">Productos</Link>
        <button
          type="button"
          className="cart-button"
          onClick={() => navigate('/cart')}
        >
          <span className="cart-icon">🛒</span>
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </button>
        {user && (
          <>
            <Link to="/dashboard/products">Mis productos</Link>
            <Link to="/dashboard/products/new">Nuevo producto</Link>
          </>
        )}
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registro</Link>
          </>
        ) : (
          <button type="button" className="btn-link" onClick={handleLogout}>
            Cerrar sesión ({user.name})
          </button>
        )}
      </nav>

    </header>
  );
};
