'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
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
    const targetX = clientX - 250; 
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
      
      <div className="container">
        <div className={styles.content}>
          {/* Text Side */}
          <div className={styles.textSide}>
            <div className={styles.badge}>
              <div className={styles.dot} />
              <span>AVAILABLE FOR WORK</span>
            </div>

            <div className={styles.titleWrapper}>
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
                transition={{ duration: 0.8, delay: 0.8 }}
                className={styles.underline}
              />
            </div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className={styles.role}
            >
              JUNIOR WEB DEVELOPER .
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className={styles.description}
            >
              Crafting immersive digital experiences through code. 
              Specializing in <span className={styles.highlight}>Next.js, TypeScript</span>, 
              and high-performance interfaces.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className={styles.actions}
            >
              <Link href="/projects" className={styles.cta}>
                <span>EXPLORE WORK</span>
                <div className={styles.ctaIcon}>
                  <ArrowRight size={20} />
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Visual Side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.2 }}
            className={styles.visualSide}
          >
            <div className={styles.imageWrapper}>
              <Image 
                src="/hero-portrait.png" 
                alt="Muhammad Uhib" 
                width={800} 
                height={1000} 
                className={styles.heroImage}
                priority 
                quality={100}
              />
              <div className={styles.geometricBackdrop} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Massive Background Text */}
      <div className={styles.bgTypography}>
        <motion.span 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          CREATIVE DEVELOPER
        </motion.span>
      </div>
    </section>
  );
};

export default Hero;
