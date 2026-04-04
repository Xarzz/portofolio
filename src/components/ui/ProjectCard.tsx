'use client';

import { motion, AnimatePresence } from 'framer-motion';
import styles from './ProjectCard.module.css';
import { ExternalLink, Github as GithubIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  tech_stack: string[];
  thumbnail: string;
  live_url: string;
  github_url: string;
  delay?: number;
}

const ProjectCard = ({ title, description, tech_stack, thumbnail, live_url, github_url, delay = 0 }: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className={`${styles.card} glass`}
    >
      <div className={styles.imageContainer}>
        <img src={thumbnail} alt={title} className={styles.image} />
        <div className={styles.overlay}>
          <div className={styles.overlayLinks}>
            <a href={live_url} target="_blank" rel="noopener noreferrer" className={styles.linkIcon} title="Live Preview">
              <ExternalLink size={24} />
            </a>
            <a href={github_url} target="_blank" rel="noopener noreferrer" className={styles.linkIcon} title="Github Source">
              <GithubIcon size={24} />
            </a>
          </div>
        </div>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <AnimatePresence>
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? 'auto' : '4.5em' }}
            className={styles.descriptionWrapper}
          >
            <p className={`${styles.description} ${!isExpanded ? styles.clamped : ''}`}>
              {description}
            </p>
          </motion.div>
        </AnimatePresence>
        
        {description.length > 100 && (
          <button 
            className={styles.toggleBtn} 
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <><ChevronUp size={16} /> Show Less</>
            ) : (
              <><ChevronDown size={16} /> View Details</>
            )}
          </button>
        )}

        <div className={styles.techStack}>
          {tech_stack.slice(0, 3).map((tech) => (
            <span key={tech} className={styles.techTag}>{tech}</span>
          ))}
          {tech_stack.length > 3 && <span className={styles.moreTech}>+{tech_stack.length - 3}</span>}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
