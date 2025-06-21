import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../public/logo-png.png';
import './AdminLogin.css';

// Brand logo and intro component
function LogoBrand() {
  return (
    <div className="admin-login-logo-brand">
      <img
        src={logo}
        alt="Init Logo"
        className="admin-login-logo"
      />
      <div className="admin-login-title">
        Init Admin Panel
      </div>
      <div className="admin-login-intro">
        Welcome to the Init admin dashboard.<br />Please log in to continue.
      </div>
    </div>
  );
}

// Error/info bar component
function ErrorBar({ message }) {
  if (!message) return null;
  return (
    <div className="admin-login-errorbar">
      {message}
    </div>
  );
}

function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password }),
        }
      );
      const data = await res.json();
      if (data.success) {
        onLogin();
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid password');
      }
    } catch (err) {
      setError('Server error');
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="admin-login-form"
    >
      <LogoBrand />
      <h2 className="admin-login-heading">
        Admin Login
      </h2>
      <input
        type="password"
        placeholder="Enter admin password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className={`admin-login-input${error ? ' error' : ''}`}
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading || !password}
        className="admin-login-button"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <ErrorBar message={error} />
    </form>
  );
}

export default AdminLogin;