'use client';

import AdminSidebar from '@/components/admin/layout/AdminSidebar';
import styles from './AdminLayout.module.css';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className={styles.adminLayout}>
      <AdminSidebar />
      <main className={styles.adminMain}>
        <div className={styles.contentContainer}>
          {children}
        </div>
      </main>
    </div>
  );
}
