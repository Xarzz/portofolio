'use client';

import { motion } from 'framer-motion';
import styles from './Dashboard.module.css';
import { 
  FolderKanban, 
  Code, 
  MessageSquare, 
  TrendingUp, 
  Eye, 
  Users, 
  Clock 
} from 'lucide-react';

const DashboardPage = () => {
  const stats = [
    { label: 'Total Projects', value: '12', icon: <FolderKanban />, trend: '+2 this month', color: '#8b5cf6' },
    { label: 'Skills Added', value: '24', icon: <Code />, trend: 'Healthy', color: '#06b6d4' },
    { label: 'New Messages', value: '5', icon: <MessageSquare />, trend: '3 unread', color: '#f59e0b' },
    { label: 'Page Views', value: '1.2k', icon: <Eye />, trend: '+15% from last week', color: '#10b981' },
  ];

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={styles.title}
        >
          Welcome Back, <span className="gradient-text">Uhib</span>
        </motion.h1>
        <p className={styles.subtitle}>Here is what's happening with your portfolio today.</p>
      </header>

      <section className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${styles.statCard} glass`}
          >
            <div className={styles.statIcon} style={{ color: stat.color, backgroundColor: `${stat.color}15` }}>
              {stat.icon}
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statLabel}>{stat.label}</h3>
              <div className={styles.statValue}>{stat.value}</div>
              <p className={styles.statTrend}>{stat.trend}</p>
            </div>
          </motion.div>
        ))}
      </section>

      <div className={styles.mainGrid}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className={`${styles.recentActivity} glass`}
        >
          <div className={styles.cardHeader}>
            <h3>Recent Activity</h3>
            <Clock size={16} />
          </div>
          <div className={styles.activityList}>
            <div className={styles.activityItem}>
              <div className={styles.activityDot} />
              <div className={styles.activityInfo}>
                <p>Updated <strong>NitroQuiz</strong> project details</p>
                <span>2 hours ago</span>
              </div>
            </div>
            <div className={styles.activityItem}>
              <div className={styles.activityDot} />
              <div className={styles.activityInfo}>
                <p>Received a new message from <strong>John Doe</strong></p>
                <span>5 hours ago</span>
              </div>
            </div>
            <div className={styles.activityItem}>
              <div className={styles.activityDot} />
              <div className={styles.activityInfo}>
                <p>Added <strong>TailwindCSS</strong> to skills</p>
                <span>Yesterday</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className={`${styles.quickActions} glass`}
        >
          <div className={styles.cardHeader}>
            <h3>Quick Actions</h3>
            <TrendingUp size={16} />
          </div>
          <div className={styles.actionGrid}>
            <button className={styles.actionBtn}>Add Project</button>
            <button className={styles.actionBtn}>New Skill</button>
            <button className={styles.actionBtn}>Edit About</button>
            <button className={styles.actionBtn}>View Messages</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
