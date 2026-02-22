import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Shield, Home, LayoutDashboard, LogOut, LogIn } from 'lucide-react';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <Shield size={24} color="var(--accent-color)" />
        SecurAuth
      </Link>
      
      <div className="nav-links">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Home size={18} /> Home
        </Link>
        
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <LayoutDashboard size={18} /> Dashboard
            </Link>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Hi, {user?.name}
            </span>
            <button 
              onClick={handleLogout} 
              className="btn btn-outline"
              style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
            >
              <LogOut size={16} /> Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn-primary" style={{ textDecoration: 'none', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
            <LogIn size={16} /> Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
