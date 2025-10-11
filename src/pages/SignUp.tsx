// SIGN UP PAGE - COMMENTED OUT
/*
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, loginUser } from '../lib/api';
import { useAuth } from '../context/AuthContext';

const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await registerUser({ name, email, password });
      const res = await loginUser({ email, password });
      if (res?.token) login(res.token);
      navigate('/');
    } catch (err: any) {
      setError(err?.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Sign Up</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
      <p className="text-sm text-gray-600 mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-orange-600 hover:underline">Login</Link>
      </p>
    </div>
  );
};

export default SignUp;
*/

// Placeholder component to prevent import errors
const SignUp = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Sign Up Page Disabled</h1>
      <p className="text-gray-600">This page has been temporarily disabled.</p>
    </div>
  );
};

export default SignUp;
