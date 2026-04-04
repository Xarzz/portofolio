'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Login.module.css';
import { Lock, Mail, Eye, EyeOff, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/admin');
      router.refresh();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${styles.loginBox} glass`}
      >
        <div className={styles.header}>
          <div className={styles.logo}>
            MUI<span>Admin</span>
          </div>
          <h1>System Login</h1>
          <p>Please enter your credentials to access the dashboard.</p>
        </div>

        {error && <div style={{ color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <Mail size={18} className={styles.inputIcon} />
            <input 
              type="email" 
              placeholder="Email Address" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <Lock size={18} className={styles.inputIcon} />
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
            <button 
              type="button" 
              className={styles.eyeBtn}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button type="submit" disabled={loading} className={styles.loginBtn}>
            {loading ? <Loader2 size={18} className={styles.spinner} /> : 'Access Dashboard'}
          </button>
        </form>

        <p className={styles.footer}>
          Secure system. Back to <a href="/">website</a>.
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
