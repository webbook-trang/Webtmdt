import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

interface LoginProps {
  onLogin: (status: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple hardcoded password for demonstration
    if (password === 'kate123') {
      onLogin(true);
      navigate('/admin');
    } else {
      setError('Mật khẩu không đúng. Truy cập bị từ chối.');
    }
  };

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-brand-dark p-8 rounded-xl border border-neutral-800 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-orange/10 text-brand-orange mb-4">
            <Lock size={24} />
          </div>
          <h1 className="font-serif text-3xl text-white">Đăng Nhập Admin</h1>
          <p className="text-neutral-400 text-sm mt-2">Vui lòng nhập mật khẩu để quản lý thư viện.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-neutral-400 text-sm mb-2">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-700 rounded p-3 text-white focus:border-brand-orange focus:outline-none transition-colors"
              placeholder="Nhập mật khẩu"
              autoFocus
            />
          </div>

          {error && (
            <div className="text-red-400 text-xs bg-red-900/20 p-2 rounded border border-red-900/50">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-brand-orange text-white font-bold py-3 rounded hover:bg-brand-orangeHover transition-colors uppercase tracking-widest text-xs"
          >
            Đăng Nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;