'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import styles from './AdminProjects.module.css';
import { Plus, Trash2, Edit, Loader2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

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

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const supabase = createClient();

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    tech_stack: '',
    live_url: '',
    github_url: '',
    thumbnail: '',
  });

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (error) {
      toast.error('Failed to load projects');
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      slug: project.slug,
      description: project.description,
      tech_stack: Array.isArray(project.tech_stack) ? project.tech_stack.join(', ') : '',
      live_url: project.live_url || '',
      github_url: project.github_url || '',
      thumbnail: project.thumbnail || '',
    });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleOpenAddModal = () => {
    setEditingProject(null);
    setFormData({
      title: '', slug: '', description: '', tech_stack: '', live_url: '', github_url: '', thumbnail: ''
    });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    let finalThumbnail = formData.thumbnail;

    // 1. Upload image if a file was selected
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${formData.slug}-${Math.random()}.${fileExt}`;
      const filePath = `projects/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portofolio-assets')
        .upload(filePath, imageFile);

      if (uploadError) {
        toast.error('Failed to upload thumbnail: ' + uploadError.message);
        setIsSubmitting(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('portofolio-assets')
        .getPublicUrl(filePath);

      finalThumbnail = publicUrlData.publicUrl;
    }

    // 2. Convert comma-separated string to array
    const techArray = formData.tech_stack.split(',').map(item => item.trim());

    const payload = {
      title: formData.title,
      slug: formData.slug,
      description: formData.description,
      live_url: formData.live_url,
      github_url: formData.github_url,
      thumbnail: finalThumbnail,
      tech_stack: techArray,
    };

    let error;

    if (editingProject) {
      // UPDATE existing project
      const res = await supabase.from('projects').update(payload).eq('id', editingProject.id);
      error = res.error;
    } else {
      // INSERT new project
      const res = await supabase.from('projects').insert([payload]);
      error = res.error;
    }

    setIsSubmitting(false);

    if (error) {
      toast.error('Failed to save project: ' + error.message);
    } else {
      toast.success(editingProject ? 'Project updated!' : 'Project added successfully!');
      setIsModalOpen(false);
      setEditingProject(null);
      setFormData({
        title: '', slug: '', description: '', tech_stack: '', live_url: '', github_url: '', thumbnail: ''
      });
      setImageFile(null);
      fetchProjects();
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) {
        toast.error('Failed to delete project');
      } else {
        toast.success('Project deleted');
        fetchProjects();
      }
    }
  };

  return (
    <div className={styles.container}>
      <Toaster position="top-right" />
      
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Projects Management</h1>
          <p className={styles.subtitle}>Add, edit, or delete your portfolio projects.</p>
        </div>
        <button className={styles.addBtn} onClick={handleOpenAddModal}>
          <Plus size={20} />
          <span>Add Project</span>
        </button>
      </div>

      {loading ? (
        <div className={styles.loader}>
          <Loader2 size={40} className={styles.spinning} />
        </div>
      ) : (
        <div className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Slug</th>
                <th>Live URL</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={4} className={styles.emptyState}>No projects found. Add one above.</td>
                </tr>
              ) : projects.map((project) => (
                <tr key={project.id}>
                  <td className={styles.fw500}>{project.title}</td>
                  <td className={styles.textMuted}>{project.slug}</td>
                  <td>
                    <a href={project.live_url} target="_blank" rel="noreferrer" className={styles.linkText}>
                      {project.live_url || '-'}
                    </a>
                  </td>
                  <td>
                    <div className={styles.actionBtns}>
                      <button className={styles.iconBtnEdit} title="Edit" onClick={() => handleEdit(project)}><Edit size={16} /></button>
                      <button onClick={() => handleDelete(project.id)} className={styles.iconBtnDelete} title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Basic Modal for adding new project */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={`${styles.modalContent} glass`}>
            <h2>{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label>Title</label>
                <input type="text" name="title" required value={formData.title} onChange={handleChange} className={styles.input} />
              </div>
              <div className={styles.inputGroup}>
                <label>Slug (URL friendly)</label>
                <input type="text" name="slug" required value={formData.slug} onChange={handleChange} className={styles.input} />
              </div>
              <div className={styles.inputGroup}>
                <label>Upload Thumbnail (Auto-uploads to Supabase)</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)} 
                  className={styles.input} 
                />
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Or enter manual URL below if you don't want to upload:</p>
                <input type="text" name="thumbnail" placeholder="Manual URL..." value={formData.thumbnail} onChange={handleChange} className={styles.input} />
              </div>
              <div className={styles.inputGroup}>
                <label>Tech Stack (Comma separated)</label>
                <input type="text" name="tech_stack" value={formData.tech_stack} onChange={handleChange} className={styles.input} />
              </div>
              <div className={styles.inputGroupRow}>
                <div className={styles.inputGroup}>
                  <label>Live URL</label>
                  <input type="text" name="live_url" value={formData.live_url} onChange={handleChange} className={styles.input} />
                </div>
                <div className={styles.inputGroup}>
                  <label>GitHub URL</label>
                  <input type="text" name="github_url" value={formData.github_url} onChange={handleChange} className={styles.input} />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label>Description</label>
                <textarea name="description" rows={3} value={formData.description} onChange={handleChange} className={styles.input}></textarea>
              </div>

              <div className={styles.modalActions}>
                <button type="button" onClick={() => setIsModalOpen(false)} className={styles.cancelBtn}>Cancel</button>
                <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
                  {isSubmitting ? 'Saving...' : (editingProject ? 'Update Project' : 'Save Project')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
