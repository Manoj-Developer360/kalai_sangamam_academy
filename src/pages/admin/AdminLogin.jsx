import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiUser, FiLock, FiArrowLeft, FiShield } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext.jsx';

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(form.username, form.password);
      if (user.role !== 'admin') {
        setError('This login is for administrators only.');
        return;
      }
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink-950 px-4">
      <div className="w-full max-w-sm">
        <Link to="/" className="flex items-center gap-2 text-slate-400 text-sm mb-8 hover:text-brass-400">
          <FiArrowLeft /> Back to site
        </Link>
        <div className="card p-8">
          <div className="flex items-center gap-2 mb-1">
            <FiShield className="text-brass-500" />
            <h1 className="font-display text-2xl text-parchment-100">Admin Login</h1>
          </div>
          <p className="text-slate-500 text-sm mb-6">Sign in to manage the academy platform.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 mb-1.5 block">Username</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  required
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="w-full bg-ink-950 border border-parchment-100/10 rounded-sm pl-10 pr-4 py-2.5 text-sm text-parchment-100 focus:border-brass-500 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1.5 block">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  required
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-ink-950 border border-parchment-100/10 rounded-sm pl-10 pr-4 py-2.5 text-sm text-parchment-100 focus:border-brass-500 outline-none"
                />
              </div>
            </div>
            {error && <p className="text-maroon-400 text-xs">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
