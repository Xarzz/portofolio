'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import styles from '../projects/AdminProjects.module.css';
import { Plus, Trash2, Edit, Loader2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface Experience {
  id: string;
  company: string;
  role: string;
  description: string;
  start_date: string;
  end_date: string | null;
  logo_url: string | null;
  image_urls: string[];
}

export const dynamic = 'force-dynamic';

export default function AdminExperience() {
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Experience | null>(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const supabase = createClient();

  const [formData, setFormData] = useState<{
    company: string;
    role: string;
    description: string;
    start_date: string;
    end_date: string;
    logo_url: string;
    image_urls: string[];
  }>({
    company: '',
    role: '',
    description: '',
    start_date: '',
    end_date: '',
    logo_url: '',
    image_urls: [],
  });

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('experience')
      .select('*')
      .order('start_date', { ascending: false });
    if (error) toast.error('Failed to load experience');
    else setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'image') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'logo') setUploadingLogo(true);
    else setUploadingImage(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${type}s/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('experience_images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('experience_images')
        .getPublicUrl(filePath);

      if (type === 'logo') {
        setFormData(prev => ({ ...prev, logo_url: publicUrl }));
      } else {
        setFormData(prev => ({ ...prev, image_urls: [...prev.image_urls, publicUrl] }));
      }
      toast.success(`${type === 'logo' ? 'Logo' : 'Image'} uploaded!`);
    } catch (error: any) {
      toast.error('Upload failed: ' + error.message);
    } finally {
      if (type === 'logo') setUploadingLogo(false);
      else setUploadingImage(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      image_urls: prev.image_urls.filter((_, i) => i !== index)
    }));
  };

  const handleEdit = (item: Experience) => {
    setEditingItem(item);
    setFormData({
      company: item.company,
      role: item.role,
      description: item.description,
      start_date: item.start_date || '',
      end_date: item.end_date || '',
      logo_url: item.logo_url || '',
      image_urls: item.image_urls || [],
    });
    setIsModalOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ company: '', role: '', description: '', start_date: '', end_date: '', logo_url: '', image_urls: [] });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      company: formData.company,
      role: formData.role,
      description: formData.description,
      start_date: formData.start_date,
      end_date: formData.end_date || null,
      logo_url: formData.logo_url || null,
      image_urls: formData.image_urls,
    };

    let error;
    if (editingItem) {
      const res = await supabase.from('experience').update(payload).eq('id', editingItem.id);
      error = res.error;
    } else {
      const res = await supabase.from('experience').insert([payload]);
      error = res.error;
    }

    setIsSubmitting(false);

    if (error) {
      toast.error('Failed to save: ' + error.message);
    } else {
      toast.success(editingItem ? 'Updated!' : 'Added!');
      setIsModalOpen(false);
      setEditingItem(null);
      fetchItems();
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this experience?')) {
      const { error } = await supabase.from('experience').delete().eq('id', id);
      if (error) toast.error('Failed to delete');
      else { toast.success('Deleted'); fetchItems(); }
    }
  };

  const formatDate = (d: string) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className={styles.container}>
      <Toaster position="top-right" />

      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Experience Management</h1>
          <p className={styles.subtitle}>Manage your professional experience timeline.</p>
        </div>
        <button className={styles.addBtn} onClick={handleOpenAdd}>
          <Plus size={20} />
          <span>Add Experience</span>
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
                <th>Icon</th>
                <th>Company</th>
                <th>Role</th>
                <th>Period</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={4} className={styles.emptyState}>No experience found. Add one above.</td>
                </tr>
              ) : items.map((item) => (
                 <tr key={item.id}>
                  <td>
                    {item.logo_url ? (
                      <img src={item.logo_url} srcSet={item.logo_url} alt="" style={{ width: 32, height: 32, borderRadius: 4, objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: 32, height: 32, background: 'rgba(255,255,255,0.05)', borderRadius: 4 }} />
                    )}
                  </td>
                  <td className={styles.fw500}>{item.company}</td>
                  <td>{item.role}</td>
                  <td className={styles.textMuted}>
                    {formatDate(item.start_date)} - {item.end_date ? formatDate(item.end_date) : 'Present'}
                  </td>
                  <td>
                    <div className={styles.actionBtns}>
                      <button className={styles.iconBtnEdit} title="Edit" onClick={() => handleEdit(item)}><Edit size={16} /></button>
                      <button className={styles.iconBtnDelete} title="Delete" onClick={() => handleDelete(item.id)}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={`${styles.modalContent} glass`}>
            <h2>{editingItem ? 'Edit Experience' : 'Add Experience'}</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label>Company</label>
                <input type="text" name="company" required value={formData.company} onChange={handleChange} className={styles.input} />
              </div>
              <div className={styles.inputGroupRow}>
                <div className={styles.inputGroup}>
                  <label>Company Logo {uploadingLogo && <Loader2 size={12} className={styles.spinning} />}</label>
                  <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'logo')} className={styles.input} />
                  {formData.logo_url && <p className={styles.fileStatus}>✓ Logo Ready</p>}
                </div>
                <div className={styles.inputGroup}>
                  <label>Work Preview(s) {uploadingImage && <Loader2 size={12} className={styles.spinning} />}</label>
                  <input type="file" multiple accept="image/*" onChange={(e) => handleFileUpload(e, 'image')} className={styles.input} />
                  <div className={styles.imageGridPreview}>
                    {formData.image_urls.map((url, i) => (
                      <div key={i} className={styles.previewThumbnail}>
                        <img src={url} alt="" />
                        <button type="button" onClick={() => removeImage(i)} className={styles.removeImgBtn}><Trash2 size={12} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label>Role / Position</label>
                <input type="text" name="role" required value={formData.role} onChange={handleChange} className={styles.input} />
              </div>
              <div className={styles.inputGroupRow}>
                <div className={styles.inputGroup}>
                  <label>Start Date</label>
                  <input type="date" name="start_date" required value={formData.start_date} onChange={handleChange} className={styles.input} />
                </div>
                <div className={styles.inputGroup}>
                  <label>End Date (empty = Present)</label>
                  <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} className={styles.input} />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label>Description</label>
                <textarea name="description" rows={4} value={formData.description} onChange={handleChange} className={styles.input}></textarea>
              </div>
              <div className={styles.modalActions}>
                <button type="button" onClick={() => setIsModalOpen(false)} className={styles.cancelBtn}>Cancel</button>
                <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
                  {isSubmitting ? 'Saving...' : (editingItem ? 'Update' : 'Save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
