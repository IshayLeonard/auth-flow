import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Shield, LockKeyhole, Zap } from 'lucide-react';

export default function Home() {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="auth-container" style={{ flexDirection: 'column', textAlign: 'center' }}>
      <div 
        className="glass-panel" 
        style={{ 
          padding: '4rem 2rem', 
          maxWidth: '800px', 
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem'
        }}
      >
        <div style={{ padding: '1.5rem', background: 'rgba(88, 166, 255, 0.1)', borderRadius: '50%', marginBottom: '1rem' }}>
          <Shield size={64} color="var(--accent-color)" />
        </div>
        
        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          Secure Authentication <br />
          <span style={{ color: 'var(--accent-color)' }}>Made Simple</span>
        </h1>
        
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', lineHeight: 1.6 }}>
          A minimal foundation designed to connect to Vercel or Netlify. Ready to test step-up authentication with OpenID integration for Genesys Cloud Web Messaging.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          {isAuthenticated ? (
            <Link to="/dashboard" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', textDecoration: 'none' }}>
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', textDecoration: 'none' }}>
                Sign In Now
              </Link>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem', textDecoration: 'none' }}>
                View GitHub
              </a>
            </>
          )}
        </div>
        
        <div style={{ display: 'flex', gap: '3rem', marginTop: '3rem', width: '100%', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
            <LockKeyhole size={24} color="#3fb950" />
            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Step-Up Ready</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
            <Zap size={24} color="#f2cc60" />
            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Fast Deployment</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
            <Shield size={24} color="#58a6ff" />
            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Genesys Web Messaging</span>
          </div>
        </div>
      </div>
    </div>
  );
}
