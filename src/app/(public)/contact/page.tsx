'use client';

import { motion } from 'framer-motion';
import styles from './Contact.module.css';
import { Mail, Github, Linkedin, Instagram } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className={styles.page}>
      {/* Floating particles background matching the futuristic theme */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: `${120 + i * 40}px`,
              height: `${120 + i * 40}px`,
              borderRadius: '50%',
              background: i % 2 === 0
                ? 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)',
              left: `${15 + (i * 30)}%`,
              top: `${20 + (i % 2) * 40}%`,
            }}
            animate={{ y: [0, -30, 0], x: [0, 20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 8 + i * 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
          />
        ))}
      </div>

      <main className={styles.mainContent}>
        <div className="container">
          <div className={styles.contentWrapper}>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={styles.title}
            >
              Let's <span className="gradient-text">Connect!</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={styles.subtitle}
            >
              Junior Web Developer passionate about building high-performance, modern, and beautiful web experiences. Ready to bring your ideas to life!
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className={styles.terminalSnippet}
            >
              <span className={styles.prompt}>&gt;</span> Services: Frontend Dev, Backend Integration, UI/UX, & Portfolio Creation.
            </motion.div>

            <motion.div 
              className={styles.socialButtons}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <a 
                href="mailto:muhammaduhibibadatarrahman@gmail.com" 
                className={styles.socialBtn}
                style={{ '--btn-color': '#ef4444' } as React.CSSProperties}
              >
                <Mail size={18} />
                <span>Email</span>
              </a>

              <a 
                href="https://github.com/Xarzz" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialBtn}
                style={{ '--btn-color': '#f8fafc' } as React.CSSProperties}
              >
                <Github size={18} />
                <span>GitHub</span>
              </a>

              <a 
                href="https://www.linkedin.com/in/muhammad-uhib-ibadatarrahman-634b3a314?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialBtn}
                style={{ '--btn-color': '#0ea5e9' } as React.CSSProperties}
              >
                <Linkedin size={18} />
                <span>LinkedIn</span>
              </a>

              <a 
                href="https://instagram.com/wforatar.q" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialBtn}
                style={{ '--btn-color': '#e1306c' } as React.CSSProperties}
              >
                <Instagram size={18} />
                <span>Instagram</span>
              </a>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
