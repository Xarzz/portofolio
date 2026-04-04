'use client';

import { motion } from 'framer-motion';
import { personalInfo } from '@/lib/dummyData';
import styles from './About.module.css';
import { User, MapPin, Mail, Award, BookOpen, Coffee } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className={styles.page}>
      {/* Background Typography */}
      <div className={styles.bgTypography} aria-hidden="true">
        <motion.div 
          initial={{ x: '-5%', opacity: 0 }}
          animate={{ x: '0%', opacity: 0.2 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={styles.bgTextLine}
        >
          LOGS
        </motion.div>
      </div>

      <header className={styles.header}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.title}
          >
            About <span className="gradient-text">Me</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={styles.subtitle}
          >
            Get to know the developer behind the code.
          </motion.p>
        </div>
      </header>

      <section className={styles.aboutSection}>
        <div className="container">
          <div className={styles.content}>
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className={styles.visualSide}
            >
              <div className={styles.techBackdrop} />
              <div className={styles.imageBox}>
                <img src="/about-profile.gif" alt={`${personalInfo.name} working`} className={styles.avatar} />
                <div className={styles.imageOverlay} />
              </div>
              <div className={`${styles.statsCard} glass`}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>Jan</span>
                  <span className={styles.statLabel}>2024 Start</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>02+</span>
                  <span className={styles.statLabel}>Real Projs</span>
                </div>
              </div>

            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
              className={styles.textSide}
            >
              <h2 className={styles.name}>{personalInfo.name}</h2>
              <p className={styles.role}>{personalInfo.title}</p>
              
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <MapPin size={18} className={styles.icon} />
                  <span>Indonesia</span>
                </div>
                <div className={styles.infoItem}>
                  <Mail size={18} className={styles.icon} />
                  <a href="mailto:muhammaduhibibadatarrahman@gmail.com" className={styles.emailLink}>
                    muhammaduhibibadatarrahman@gmail.com
                  </a>
                </div>
              </div>

              <div className={styles.bio}>
                <p>{personalInfo.bio}</p>
                <p>
                  My journey in tech began with a simple curiosity about how websites work. Today, I'm dedicated to Mastering the latest web technologies and delivering high-quality software that solves real-world problems.
                </p>
              </div>

              <div className={styles.highlights}>
                <div className={styles.highlight}>
                  <Award size={20} className={styles.icon} />
                  <span>Passionate about Clean Code</span>
                </div>
                <div className={styles.highlight}>
                  <BookOpen size={20} className={styles.icon} />
                  <span>Continuous Learner</span>
                </div>
                <div className={styles.highlight}>
                  <Coffee size={20} className={styles.icon} />
                  <span>Problem Solver</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
