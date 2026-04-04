'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import styles from './Experience.module.css';
import { Calendar, Briefcase, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import UniversalLoader from '@/components/ui/UniversalLoader';

interface Experience {
  id: string;
  company: string;
  role: string;
  description: string;
  start_date: string;
  end_date: string | null;
  logo_url: string | null;
  image_urls: string[];
}

const UI_TEXT: Record<string, { title: string; titleAccent: string; subtitle: string; present: string }> = {
  en: {
    title: 'My ',
    titleAccent: 'Journey',
    subtitle: 'A timeline of my professional experience and growth as a developer.',
    present: 'Present',
  },
  id: {
    title: 'Perjalanan ',
    titleAccent: 'Saya',
    subtitle: 'Garis waktu pengalaman profesional dan pertumbuhan saya sebagai pengembang.',
    present: 'Sekarang',
  },
};

const cardVariants: Variants = {
  hidden: (i: number) => ({
    opacity: 0,
    x: i % 2 === 0 ? -40 : 40,
    y: 20,
  }),
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 60,
      damping: 15,
      delay: i * 0.15,
    },
  }),
};

const ExperienceCarousel = ({ urls }: { urls: string[] }) => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (urls.length <= 1 || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % urls.length);
    }, 3000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [urls.length, isPaused]);

  if (!urls || urls.length === 0) return null;

  return (
    <div 
      className={styles.workPreview}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={urls[index]}
          src={urls[index]}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className={styles.previewImg}
          alt="Work Experience Preview"
        />
      </AnimatePresence>
      <div className={styles.imageOverlay} />
      
      {urls.length > 1 && (
        <div className={styles.carouselIndicators}>
          {urls.map((_, i) => (
            <div 
              key={i} 
              className={`${styles.indicator} ${i === index ? styles.activeIndicator : ''}`} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const dynamic = 'force-dynamic';

const ExperiencePage = () => {
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('en');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const supabase = createClient();

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data: langData } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'site_language')
        .single();
      if (langData?.value) setLang(langData.value);

      const { data, error } = await supabase
        .from('experience')
        .select('*')
        .order('start_date', { ascending: false });

      if (error) {
        console.error('Error fetching experience:', error);
      }

      if (data && data.length > 0) {
        setItems(data);
      } else {
        // Fallback for demo when table is truly empty
        setItems([]);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const t = UI_TEXT[lang] || UI_TEXT.en;

  const formatDate = (d: string) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  if (loading) {
    return <UniversalLoader fullScreen />;
  }

  return (
    <div className={styles.page}>
      {/* Floating particles */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: `${80 + i * 30}px`,
              height: `${80 + i * 30}px`,
              borderRadius: '50%',
              background: i % 2 === 0
                ? 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)',
              right: `${5 + i * 20}%`,
              top: `${15 + i * 20}%`,
            }}
            animate={{ y: [0, -25, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 7 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
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

      <section className={styles.timelineSection}>
        <div className="container">
          <div className={styles.timeline}>
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className={styles.timelineItem}
              >
                {/* Glowing dot */}
                <div className={styles.dotOuter}>
                  <div className={styles.dotInner} />
                </div>

                <div className={`${styles.card} glass`}>
                  <motion.div
                    className={styles.iconContainer}
                    whileHover={{ rotate: -10, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    {item.logo_url ? (
                      <img src={item.logo_url} alt={item.company} className={styles.logoImg} />
                    ) : (
                      <Briefcase size={24} />
                    )}
                  </motion.div>

                  <div className={styles.content}>
                    <div className={styles.date}>
                      <Calendar size={14} />
                      {formatDate(item.start_date)} —{' '}
                      {item.end_date ? (
                        formatDate(item.end_date)
                      ) : (
                        <span className={styles.presentBadge}>
                          <span className={styles.presentDot} />
                          {t.present}
                        </span>
                      )}
                    </div>
                    <h2 className={styles.role}>{item.role}</h2>
                    <h3 className={styles.company}>{item.company}</h3>
                    
                    <div className={styles.descriptionWrapper}>
                      <p className={`${styles.description} ${!expandedItems[item.id] ? styles.clamped : ''}`}>
                        {item.description}
                      </p>
                    </div>

                    {item.description.length > 150 && (
                      <button 
                        className={styles.toggleBtn} 
                        onClick={() => toggleExpand(item.id)}
                      >
                        {expandedItems[item.id] ? 'Show Less' : 'Read More...'}
                      </button>
                    )}

                    {item.image_urls && item.image_urls.length > 0 && (
                      <ExperienceCarousel urls={item.image_urls} />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExperiencePage;
