'use client';

import Link from 'next/link';
import styles from './Navbar.module.css';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Arsenal', path: '/skills' },
    { name: 'Experience', path: '/experience' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} glass`}>
      <div className="container" id="nav-container">
        <Link href="/" className={styles.logo}>
          MUI<span>.</span>
        </Link>

        {/* Desktop Menu */}
        <ul className={styles.navLinks}>
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link 
                href={link.path} 
                className={`${styles.navLink} ${pathname === link.path ? styles.active : ''}`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Icon */}
        <button 
          className={styles.mobileMenuBtn} 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className={styles.mobileMenu}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className={styles.mobileMenuHeader}>
                 <Link href="/" className={styles.logo} onClick={() => setIsOpen(false)}>
                  MUI<span>.</span>
                </Link>
                <button onClick={() => setIsOpen(false)} className={styles.closeBtn}>
                  <X size={28} />
                </button>
              </div>

              <ul className={styles.mobileLinks}>
                {navLinks.map((link, i) => (
                  <motion.li 
                    key={link.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link 
                      href={link.path} 
                      className={`${styles.mobileLink} ${pathname === link.path ? styles.mobileActive : ''}`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className={styles.linkNumber}>0{i+1}</span>
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
