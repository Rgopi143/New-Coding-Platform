import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../lib/api';
import { useAuth } from '../context/AuthContext';

const BACKEND_BASE = (import.meta as any).env?.VITE_API_URL?.replace(/\/+$/, '') || '';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await loginUser({ email, password });
      if (res?.token) login(res.token);
      navigate('/');
    } catch (err: any) {
      setError(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Login</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-60"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="mt-6">
        <div className="flex items-center mb-3">
          <div className="flex-1 border-t" />
          <span className="mx-3 text-gray-500 text-sm">Or continue with</span>
          <div className="flex-1 border-t" />
        </div>
        <div className="grid grid-cols-1 gap-2">
          <a href={`${BACKEND_BASE}/api/oauth/google`} className="w-full px-4 py-2 border rounded-lg text-center hover:bg-gray-50">Google</a>
          <a href={`${BACKEND_BASE}/api/oauth/github`} className="w-full px-4 py-2 border rounded-lg text-center hover:bg-gray-50">GitHub</a>
          <a href={`${BACKEND_BASE}/api/oauth/facebook`} className="w-full px-4 py-2 border rounded-lg text-center hover:bg-gray-50">Facebook</a>
        </div>
      </div>

      <p className="text-sm text-gray-600 mt-4">
        Don't have an account?{' '}
        <Link to="/signup" className="text-orange-600 hover:underline">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
