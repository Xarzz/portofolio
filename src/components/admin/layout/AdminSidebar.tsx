'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './AdminSidebar.module.css';
import { LayoutDashboard, FolderKanban, Code, Briefcase, MessageSquare, Settings, LogOut, ExternalLink } from 'lucide-react';

const AdminSidebar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Projects', path: '/admin/projects', icon: <FolderKanban size={20} /> },
    { name: 'Arsenal', path: '/admin/skills', icon: <Code size={20} /> },
    { name: 'Experience', path: '/admin/experience', icon: <Briefcase size={20} /> },
    { name: 'Messages', path: '/admin/messages', icon: <MessageSquare size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside className={`${styles.sidebar} glass`}>
      <div className={styles.header}>
        <Link href="/admin" className={styles.logo}>
          MUI<span>Admin</span>
        </Link>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link 
                href={link.path} 
                className={`${styles.navLink} ${pathname === link.path ? styles.active : ''}`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.footer}>
        <hr className={styles.divider} />
        <Link href="/" target="_blank" className={styles.navLink}>
          <ExternalLink size={20} />
          <span>View Site</span>
        </Link>
        <button className={styles.logoutBtn}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
