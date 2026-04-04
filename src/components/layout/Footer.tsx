'use client';

import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.bottom}>
          <p>&copy; {currentYear} Muhammad Uhib Ibadatarrahman. Built with Next.js 15.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
