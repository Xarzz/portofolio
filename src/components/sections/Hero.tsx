'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './Hero.module.css';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  // Spring animation config for that aggressive, fast snap feel
  const springConfig = { type: "spring" as const, stiffness: 100, damping: 15, mass: 1 };
  
  // Mouse Follow Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 10 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 10 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const targetX = clientX - 250; // offset defined half of width
    const targetY = clientY - 250;
    mouseX.set(targetX);
    mouseY.set(targetY);
  };
  
  return (
    <section className={styles.hero} onMouseMove={handleMouseMove}>
      
      {/* Mouse Follow Glow */}
      <motion.div
        className={styles.cursorGlow}
        style={{
          x: springX,
          y: springY,
        }}
      />
      {/* Cyberpunk Grid Background */}
      <div className="cyber-layer-bg" />
      
      {/* Massive Background Typography */}
      <div className={styles.bgTypography} aria-hidden="true">
        <motion.div 
          initial={{ x: '-10%', opacity: 0 }}
          animate={{ x: '0%', opacity: 0.03 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={styles.bgTextLine}
        >
          CREATIVE
        </motion.div>
        <motion.div 
          initial={{ x: '10%', opacity: 0 }}
          animate={{ x: '-2%', opacity: 0.03 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          className={`${styles.bgTextLine} ${styles.bgTextOutline}`}
        >
          DEVELOPER
        </motion.div>
      </div>

      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springConfig}
            className={styles.headerBlock}
          >
            <div className={styles.nameBlock}>
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...springConfig, delay: 0.3 }}
                className={styles.firstName}
              >
                MUHAMMAD
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...springConfig, delay: 0.4 }}
                className={styles.lastName}
              >
                UHIB
              </motion.span>
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.6 }}
                className={styles.voltLine}
              />
            </div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springConfig, delay: 0.5 }}
              className={styles.title}
            >
              Junior Web Developer <span className="volt-text">.</span>
            </motion.h2>
          </motion.div>

          <div className={styles.lowerInfo}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...springConfig, delay: 0.7 }}
              className={styles.statusBadge}
            >
              <div className={styles.statusDot} />
              AVAILABLE FOR WORK
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springConfig, delay: 0.8 }}
              className={styles.description}
            >
              Crafting immersive digital experiences through code. 
              Specializing in <span className={styles.highlight}>Next.js</span>, 
              <span className={styles.highlight}>TypeScript</span>, and high-performance interfaces.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springConfig, delay: 0.9 }}
              className={styles.actions}
            >
              <Link href="/projects" className={styles.primaryBtn}>
                <span className={styles.btnText}>EXPLORE WORK</span>
                <span className={styles.btnIconVolt}>
                  <ArrowRight size={24} />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Abstract Tech Visual */}
        <motion.div 
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
          className={styles.visualSide}
        >
          <div className={styles.imageWrapper}>
            <img 
              src="/hero-portrait.png" 
              alt="Muhammad Uhib Ibadatarrahman" 
              className={styles.heroImage} 
            />
            {/* Sporty Geometric Backdrop instead of corner */}
            <div className={styles.geometricBackdrop} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
