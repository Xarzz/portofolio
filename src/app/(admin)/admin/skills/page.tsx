'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import styles from '../projects/AdminProjects.module.css';
import { Plus, Trash2, Edit, Loader2, Shield, Code2, Server, Wrench } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface ArsenalItem {
  id: string;
  category: string;
  name: string;
  icon_url: string;
  color: string;
  sort_order: number;
}

const CATEGORY_ICONS: Record<string, string> = {
  'Frontend': '💻',
  'Backend': '⚙️',
  'Cyber Security': '🛡️',
  'Tools & Design': '🔧',
};

export default function AdminArsenal() {
  const [items, setItems] = useState<ArsenalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ArsenalItem | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const supabase = createClient();

  const [formData, setFormData] = useState({
    category: 'Frontend',
    name: '',
    icon_url: '',
    color: '#8b5cf6',
    sort_order: 0,
  });

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('arsenal')
      .select('*')
      .order('category')
      .order('sort_order', { ascending: true });
    if (error) {
      toast.error('Failed to load arsenal items');
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (item: ArsenalItem) => {
    setEditingItem(item);
    setFormData({
      category: item.category,
      name: item.name,
      icon_url: item.icon_url || '',
      color: item.color || '#8b5cf6',
      sort_order: item.sort_order || 0,
    });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ category: 'Frontend', name: '', icon_url: '', color: '#8b5cf6', sort_order: 0 });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let finalIconUrl = formData.icon_url;

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `arsenal-${formData.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.${fileExt}`;
      const filePath = `arsenal/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portofolio-assets')
        .upload(filePath, imageFile);

      if (uploadError) {
        toast.error('Failed to upload icon: ' + uploadError.message);
        setIsSubmitting(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('portofolio-assets')
        .getPublicUrl(filePath);

      finalIconUrl = publicUrlData.publicUrl;
    }

    const payload = {
      category: formData.category,
      name: formData.name,
      icon_url: finalIconUrl,
      color: formData.color,
      sort_order: Number(formData.sort_order),
    };

    let error;
    if (editingItem) {
      const res = await supabase.from('arsenal').update(payload).eq('id', editingItem.id);
      error = res.error;
    } else {
      const res = await supabase.from('arsenal').insert([payload]);
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
    if (window.confirm('Delete this item?')) {
      const { error } = await supabase.from('arsenal').delete().eq('id', id);
      if (error) toast.error('Failed to delete');
      else { toast.success('Deleted'); fetchItems(); }
    }
  };

  const grouped = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ArsenalItem[]>);

  return (
    <div className={styles.container}>
      <Toaster position="top-right" />

      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Arsenal Management</h1>
          <p className={styles.subtitle}>Manage your Technical Arsenal that appears on the public site.</p>
        </div>
        <button className={styles.addBtn} onClick={handleOpenAdd}>
          <Plus size={20} />
          <span>Add Tech</span>
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
                <th>Category</th>
                <th>Tech Name</th>
                <th>Icon</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={4} className={styles.emptyState}>No arsenal items found. Add one above.</td>
                </tr>
              ) : items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <span style={{ marginRight: '0.5rem' }}>{CATEGORY_ICONS[item.category] || '📦'}</span>
                    {item.category}
                  </td>
                  <td className={styles.fw500}>{item.name}</td>
                  <td>
                    {item.icon_url ? (
                      <img src={item.icon_url} alt={item.name} style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
                    ) : '-'}
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
            <h2>{editingItem ? 'Edit Tech' : 'Add New Tech'}</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className={styles.input}>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Cyber Security">Cyber Security</option>
                  <option value="Tools & Design">Tools & Design</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>Tech Name</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange} className={styles.input} />
              </div>
              <div className={styles.inputGroup}>
                <label>Upload Icon (SVG/PNG)</label>
                <input type="file" accept="image/*,.svg" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className={styles.input} />
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Or enter URL:</p>
                <input type="text" name="icon_url" placeholder="/icons/tech.svg" value={formData.icon_url} onChange={handleChange} className={styles.input} />
              </div>
              <div className={styles.inputGroupRow}>
                <div className={styles.inputGroup}>
                  <label>Color (hex)</label>
                  <input type="color" name="color" value={formData.color} onChange={handleChange} className={styles.input} style={{ height: '44px' }} />
                </div>
                <div className={styles.inputGroup}>
                  <label>Sort Order</label>
                  <input type="number" name="sort_order" value={formData.sort_order} onChange={handleChange} className={styles.input} />
                </div>
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
