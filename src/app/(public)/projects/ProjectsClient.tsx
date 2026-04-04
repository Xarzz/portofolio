'use client';

import { motion, Variants } from 'framer-motion';
import ProjectCard from '@/components/ui/ProjectCard';
import styles from './Projects.module.css';
import { FolderKanban, Star } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  tech_stack: string[];
  live_url: string;
  github_url: string;
  thumbnail: string;
  featured: boolean;
}

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { type: 'spring' as const, stiffness: 80 } 
  },
};

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const featuredCount = projects.filter(p => p.featured).length;

  return (
    <div className={styles.page}>
      {/* Floating background particles */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`,
              borderRadius: '50%',
              background: i % 2 === 0 
                ? 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)',
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6 + i * 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <header className={styles.header}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.title}
          >
            My <span className="gradient-text">Projects</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={styles.subtitle}
          >
            Explore a selection of my latest work, including web apps and software solutions.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className={styles.stats}
          >
            <div className={styles.statBadge}>
              <FolderKanban size={16} />
              <strong>{projects.length}</strong> Projects
            </div>
            {featuredCount > 0 && (
              <div className={styles.statBadge}>
                <Star size={16} />
                <strong>{featuredCount}</strong> Featured
              </div>
            )}
          </motion.div>
        </div>
      </header>

      <section className={styles.gridSection}>
        <div className="container">
          {projects.length === 0 ? (
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }}
               style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '2rem' }}
             >
                <p>No projects found. Log in to the admin panel to add some!</p>
             </motion.div>
          ) : (
            <motion.div 
              className={styles.grid}
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {projects.map((project, index) => (
                <motion.div key={project.id} variants={item}>
                  <ProjectCard 
                    {...project}
                    delay={0}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
