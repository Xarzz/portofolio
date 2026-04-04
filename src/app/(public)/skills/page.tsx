'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Skills.module.css';
import { Code2, Server, Shield, Wrench, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import UniversalLoader from '@/components/ui/UniversalLoader';

interface ArsenalItem {
  id: string;
  category: string;
  name: string;
  icon_url: string;
  color: string;
  sort_order: number;
}

interface CategoryGroup {
  category: string;
  color: string;
  icon: React.ReactNode;
  items: ArsenalItem[];
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Frontend': <Code2 size={22} />,
  'Backend': <Server size={22} />,
  'Cyber Security': <Shield size={22} />,
  'Tools & Design': <Wrench size={22} />,
};

const CATEGORY_COLORS: Record<string, string> = {
  'Frontend': '#8b5cf6',
  'Backend': '#06b6d4',
  'Cyber Security': '#ef4444',
  'Tools & Design': '#f59e0b',
};

// UI text per language
const UI_TEXT: Record<string, { title: string; titleAccent: string; subtitle: string }> = {
  en: {
    title: 'Technical ',
    titleAccent: 'Arsenal',
    subtitle: 'The technologies and tools I use to build, secure, and ship products.',
  },
  id: {
    title: 'Persenjataan ',
    titleAccent: 'Teknis',
    subtitle: 'Teknologi dan alat yang saya gunakan untuk membangun, mengamankan, dan mengirimkan produk.',
  },
};

const SkillsPage = () => {
  const [groups, setGroups] = useState<CategoryGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('en');
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      // Fetch language setting
      const { data: langData } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'site_language')
        .single();
      if (langData?.value) setLang(langData.value);

      // Fetch arsenal items
      const { data, error } = await supabase
        .from('arsenal')
        .select('*')
        .order('category')
        .order('sort_order', { ascending: true });

      if (data && data.length > 0) {
        const grouped: Record<string, ArsenalItem[]> = {};
        data.forEach((item: ArsenalItem) => {
          if (!grouped[item.category]) grouped[item.category] = [];
          grouped[item.category].push(item);
        });

        const result: CategoryGroup[] = Object.entries(grouped).map(([cat, items]) => ({
          category: cat,
          color: items[0]?.color || CATEGORY_COLORS[cat] || '#8b5cf6',
          icon: CATEGORY_ICONS[cat] || <Code2 size={22} />,
          items,
        }));
        setGroups(result);
      } else {
        // Fallback to hardcoded data if no DB data
        setGroups([
          { category: 'Frontend', color: '#8b5cf6', icon: <Code2 size={22} />, items: [
            { id: '1', category: 'Frontend', name: 'Next.js', icon_url: '/icons/nextjs.svg', color: '#8b5cf6', sort_order: 0 },
            { id: '2', category: 'Frontend', name: 'React', icon_url: '/icons/react.svg', color: '#8b5cf6', sort_order: 1 },
          ]},
          { category: 'Backend', color: '#06b6d4', icon: <Server size={22} />, items: [
            { id: '3', category: 'Backend', name: 'Laravel', icon_url: '/icons/laravel.svg', color: '#06b6d4', sort_order: 0 },
            { id: '4', category: 'Backend', name: 'Supabase', icon_url: '/icons/supabase.svg', color: '#06b6d4', sort_order: 1 },
            { id: '5', category: 'Backend', name: 'XAMPP', icon_url: '/icons/xampp.svg', color: '#06b6d4', sort_order: 2 },
          ]},
          { category: 'Cyber Security', color: '#ef4444', icon: <Shield size={22} />, items: [
            { id: '6', category: 'Cyber Security', name: 'Kali Linux', icon_url: '/icons/kali.svg', color: '#ef4444', sort_order: 0 },
            { id: '7', category: 'Cyber Security', name: 'Wireshark', icon_url: '/icons/wireshark.svg', color: '#ef4444', sort_order: 1 },
            { id: '8', category: 'Cyber Security', name: 'Nmap', icon_url: '/icons/nmap.svg', color: '#ef4444', sort_order: 2 },
          ]},
          { category: 'Tools & Design', color: '#f59e0b', icon: <Wrench size={22} />, items: [
            { id: '9', category: 'Tools & Design', name: 'Git', icon_url: '/icons/git.svg', color: '#f59e0b', sort_order: 0 },
            { id: '10', category: 'Tools & Design', name: 'Gemini AI', icon_url: '/icons/gemini.svg', color: '#f59e0b', sort_order: 1 },
          ]},
        ]);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const t = UI_TEXT[lang] || UI_TEXT.en;

  if (loading) {
    return <UniversalLoader fullScreen />;
  }

  return (
    <div className={styles.page}>
      {/* Floating particles background */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: `${100 + i * 40}px`,
              height: `${100 + i * 40}px`,
              borderRadius: '50%',
              background: i % 2 === 0
                ? 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(239,68,68,0.04) 0%, transparent 70%)',
              left: `${(i * 25) % 100}%`,
              top: `${10 + (i * 20)}%`,
            }}
            animate={{ y: [0, -30, 0], x: [0, 20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 8 + i * 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
          />
        ))}
      </div>

      <header className={styles.header}>
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.title}
          >
            {t.title}<span className="gradient-text">{t.titleAccent}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={styles.subtitle}
          >
            {t.subtitle}
          </motion.p>
        </div>
      </header>

      <section className={styles.arsenalSection}>
        <div className="container">
          <div className={styles.categories}>
            {groups.map((cat, catIndex) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.12, type: 'spring', stiffness: 80 }}
                className={`${styles.categoryCard} glass`}
              >
                <div className={styles.categoryHeader}>
                  <div className={styles.categoryIcon} style={{ color: cat.color, borderColor: cat.color }}>
                    {cat.icon}
                  </div>
                  <h2 className={styles.categoryTitle} style={{ color: cat.color }}>{cat.category}</h2>
                </div>

                <div className={styles.techGrid}>
                  {cat.items.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + idx * 0.08 }}
                      whileHover={{ y: -4, scale: 1.04 }}
                      className={styles.techItem}
                    >
                      <div className={styles.techIconWrap} style={{ boxShadow: `0 0 20px ${cat.color}15` }}>
                        <img src={item.icon_url} alt={item.name} className={styles.techIcon} />
                      </div>
                      <span className={styles.techName}>{item.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SkillsPage;
