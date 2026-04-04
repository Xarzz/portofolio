'use client';

import { motion } from 'framer-motion';
import styles from './UniversalLoader.module.css';

const UniversalLoader = ({ fullScreen = false }: { fullScreen?: boolean }) => {
  return (
    <div className={`${styles.loaderContainer} ${fullScreen ? styles.fullScreen : ''}`}>
      <div className={styles.loaderWrapper}>
        {/* The Core Diamond */}
        <motion.div 
          className={styles.diamond}
          animate={{ 
            rotateY: [0, 180, 360],
            y: [0, -15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <div className={styles.diamondSide} />
          <div className={styles.diamondSide} />
          <div className={styles.glow} />
        </motion.div>

        {/* Orbiting Scanning Rings */}
        <motion.div 
          className={styles.ring}
          animate={{ rotate: 360, scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className={styles.ringInner}
          animate={{ rotate: -360, scale: [1, 0.8, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* Scanning Pulse */}
        <motion.div 
          className={styles.pulse}
          animate={{ 
            scale: [0.8, 2.5], 
            opacity: [0.6, 0] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeOut" 
          }}
        />

        {/* Loading Text */}
        <motion.div 
          className={styles.loadingText}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          System Initializing<span>...</span>
        </motion.div>
      </div>
    </div>
  );
};

export default UniversalLoader;
