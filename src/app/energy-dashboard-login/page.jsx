'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, Lock, User, Eye, EyeOff } from 'lucide-react';

export default function EnergyDashboardLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, pageName: '/energy-dashboard' }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || 'Invalid username or password');
        return;
      }

      localStorage.setItem('energy_system_token', data.token || '');
      localStorage.setItem('energy_system_user', JSON.stringify({
        userId: data.userId,
        username: data.username,
        name: data.name,
        email: data.email,
        site: data.site,
        typeID: data.typeID,
        departmentID: data.departmentID,
      }));

      router.push('/energy-dashboard');
    } catch (err) {
      setError(err.message || 'Connection error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0369a1 0%, #0c4a6e 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 20,
        padding: '48px 40px',
        width: '100%',
        maxWidth: 420,
        boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
      }}>
        {/* Icon */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 72, height: 72,
            background: 'linear-gradient(135deg, #0369a1, #0c4a6e)',
            borderRadius: '50%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
          }}>
            <Zap size={36} color="#fff" />
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1e293b', margin: 0 }}>
            Green Retail Group
          </h1>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 8, lineHeight: 1.6 }}>
            ระบบมอนิเตอริ่งพลังงานไฟฟ้า
          </p>
          <div style={{ marginTop: 10, fontSize: 12, color: '#94a3b8' }}>
            <span>it@green-retail.example.com</span>
            <span style={{ margin: '0 6px' }}>·</span>
            <span>02-555-1199</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                placeholder="Enter username"
                style={{
                  width: '100%', padding: '10px 12px 10px 38px',
                  borderRadius: 10, border: '2px solid #e5e7eb',
                  fontSize: 14, outline: 'none', boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = '#0369a1'}
                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="Enter password"
                style={{
                  width: '100%', padding: '10px 38px 10px 38px',
                  borderRadius: 10, border: '2px solid #e5e7eb',
                  fontSize: 14, outline: 'none', boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = '#0369a1'}
                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 0 }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div style={{
              background: '#fef2f2', border: '1px solid #fecaca',
              borderRadius: 8, padding: '10px 14px',
              color: '#dc2626', fontSize: 13, marginBottom: 16,
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '12px',
              background: loading ? '#7dd3fc' : 'linear-gradient(135deg, #0369a1, #0c4a6e)',
              color: '#fff', border: 'none', borderRadius: 10,
              fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <a
            href="/"
            style={{ fontSize: 13, color: '#0369a1', textDecoration: 'none' }}
            onClick={(e) => { e.preventDefault(); window.location.href = '/'; }}
          >
            ← กลับหน้าหลัก
          </a>
        </div>
      </div>
    </div>
  );
}
