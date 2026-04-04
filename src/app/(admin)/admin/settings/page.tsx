'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import styles from '../projects/AdminProjects.module.css';
import { Loader2, Save, Globe } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [language, setLanguage] = useState('en');
  const supabase = createClient();

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .eq('key', 'site_language')
        .single();

      if (data) {
        setLanguage(data.value || 'en');
      }
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);

    // Upsert: insert if not exists, update if exists
    const { error } = await supabase
      .from('settings')
      .upsert(
        { key: 'site_language', value: language },
        { onConflict: 'key' }
      );

    setSaving(false);

    if (error) {
      toast.error('Failed to save settings: ' + error.message);
    } else {
      toast.success('Settings saved! Language set to ' + (language === 'en' ? 'English' : 'Bahasa Indonesia'));
    }
  };

  if (loading) {
    return (
      <div className={styles.loader}>
        <Loader2 size={40} className={styles.spinning} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Toaster position="top-right" />

      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Site Settings</h1>
          <p className={styles.subtitle}>Configure your portfolio website settings.</p>
        </div>
      </div>

      <div className={styles.tableCard} style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Globe size={22} style={{ color: 'var(--primary)' }} />
          <h2 style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>Language / Bahasa</h2>
        </div>

        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
          Choose the language for your public portfolio website. Content from the database will be displayed as-is, but UI labels (headings, buttons, descriptions) will switch to the selected language.
        </p>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button
            onClick={() => setLanguage('en')}
            style={{
              flex: 1,
              padding: '1.25rem',
              borderRadius: '12px',
              border: language === 'en' ? '2px solid var(--primary)' : '1px solid var(--glass-border)',
              background: language === 'en' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(255,255,255,0.03)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textAlign: 'center' as const,
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🇬🇧</div>
            <div style={{ fontWeight: 700, fontSize: '1rem' }}>English</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>Default language</div>
          </button>
          <button
            onClick={() => setLanguage('id')}
            style={{
              flex: 1,
              padding: '1.25rem',
              borderRadius: '12px',
              border: language === 'id' ? '2px solid var(--primary)' : '1px solid var(--glass-border)',
              background: language === 'id' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(255,255,255,0.03)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textAlign: 'center' as const,
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🇮🇩</div>
            <div style={{ fontWeight: 700, fontSize: '1rem' }}>Bahasa Indonesia</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>Indonesian language</div>
          </button>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--primary)',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '12px',
            fontWeight: 600,
            cursor: saving ? 'not-allowed' : 'pointer',
            opacity: saving ? 0.7 : 1,
            transition: 'all 0.2s ease',
          }}
        >
          <Save size={18} />
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}
