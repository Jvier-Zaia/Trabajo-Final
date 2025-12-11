import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerRequest } from '../services/api';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      await registerRequest({ name, email, password });
      setSuccess('Usuario registrado, ahora puedes iniciar sesión');
      setTimeout(() => navigate('/login'), 1200);
    } catch (e: any) {
      setError(e.response?.data?.error ?? e.message ?? 'Error de registro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Creando cuenta...' : 'Registrarse'}
        </button>
      </form>
    </div>
  );
};
