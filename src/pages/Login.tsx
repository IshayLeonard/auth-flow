import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { KeyRound, Loader2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      await login(email, password);
      // Wait for navigation in the actual app flow
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid credentials');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="glass-panel auth-card">
        <div className="auth-header">
          <div style={{ padding: '1rem', background: 'rgba(88, 166, 255, 0.1)', borderRadius: '50%', marginBottom: '1rem', display: 'inline-block' }}>
            <KeyRound size={48} color="var(--accent-color)" />
          </div>
          <h1>Welcome Back</h1>
          <p>Sign in to access your dashboard and configure SSO</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              id="email" 
              type="email" 
              placeholder="name@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ marginTop: '0.5rem' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              'Sign In'
            )}
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          For testing, use any valid email address and any password.
        </div>
      </div>
    </div>
  );
}
