import React, { useEffect, useState } from 'react';
import { FiUser } from 'react-icons/fi';
import AdminDashboardLayout from '../../layouts/AdminDashboardLayout.jsx';
import AdminPageHeader from '../../components/dashboard/admin/AdminPageHeader.jsx';
import Modal from '../../components/dashboard/admin/Modal.jsx';
import ConfirmDialog from '../../components/dashboard/admin/ConfirmDialog.jsx';
import { SkeletonGrid, ErrorState, EmptyState } from '../../components/common/StateViews.jsx';
import { adminService } from '../../services/adminService';
import { useToast } from '../../context/ToastContext.jsx';

const emptyForm = { name: '', role: '', specialization: '', experience_years: '', achievements: '', bio: '', display_order: 0 };

const AdminMasters = () => {
  const { showToast } = useToast();
  const [masters, setMasters] = useState(null);
  const [error, setError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => adminService.getMastersAdmin().then(({ data }) => setMasters(data.data)).catch(() => setError(true));
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setFile(null); setModalOpen(true); };
  const openEdit = (m) => { setEditing(m); setForm({ ...emptyForm, ...m }); setFile(null); setModalOpen(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v ?? ''));
      if (file) fd.append('photo', file);

      if (editing) {
        await adminService.updateMaster(editing.id, fd);
        showToast('Master updated successfully.');
      } else {
        await adminService.createMaster(fd);
        showToast('Master added successfully.');
      }
      setModalOpen(false);
      load();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to save master.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await adminService.deleteMaster(confirmId);
      showToast('Master deleted.');
      setConfirmId(null);
      load();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to delete master.', 'error');
    }
  };

  return (
    <AdminDashboardLayout>
      <AdminPageHeader title="Masters" subtitle="Founders, directors, head coaches and game-wise masters." actionLabel="Add Master" onAction={openCreate} />

      {!masters && !error && <SkeletonGrid count={4} className="sm:grid-cols-2 lg:grid-cols-4" />}
      {error && <ErrorState message="Couldn't load masters right now." />}
      {masters && masters.length === 0 && <EmptyState message="No masters added yet." />}

      {masters && masters.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {masters.map((m) => (
            <div key={m.id} className="card overflow-hidden">
              <div className="h-40 bg-ink-700 flex items-center justify-center">
                {m.photo_url ? <img src={m.photo_url} alt={m.name} className="w-full h-full object-cover" /> : <FiUser className="text-4xl text-slate-600" />}
              </div>
              <div className="p-4">
                <p className="font-display text-parchment-100">{m.name}</p>
                <p className="text-xs text-brass-400">{m.role}</p>
                <p className="text-xs text-slate-500 mt-1">Order: {m.display_order} &middot; {m.status}</p>
                <div className="flex gap-3 mt-3">
                  <button onClick={() => openEdit(m)} className="text-brass-400 text-xs hover:underline">Edit</button>
                  <button onClick={() => setConfirmId(m.id)} className="text-maroon-400 text-xs hover:underline">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Master' : 'Add Master'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 mb-1.5 block">Photo (uploaded to Cloudinary)</label>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="text-sm text-slate-300" />
          </div>
          <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
          <Field label="Role (Founder / Director / Head Coach / Master)" value={form.role} onChange={(v) => setForm({ ...form, role: v })} required />
          <Field label="Specialization" value={form.specialization} onChange={(v) => setForm({ ...form, specialization: v })} />
          <Field label="Experience (years)" type="number" value={form.experience_years} onChange={(v) => setForm({ ...form, experience_years: v })} />
          <Field label="Achievements" value={form.achievements} onChange={(v) => setForm({ ...form, achievements: v })} />
          <div>
            <label className="text-xs text-slate-400 mb-1.5 block">Short Bio</label>
            <textarea rows={3} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="w-full bg-ink-950 border border-parchment-100/10 rounded-sm px-4 py-2.5 text-sm text-parchment-100 focus:border-brass-500 outline-none resize-none" />
          </div>
          <Field label="Display Order" type="number" value={form.display_order} onChange={(v) => setForm({ ...form, display_order: v })} />
          <button type="submit" disabled={saving} className="btn-primary w-full disabled:opacity-60">
            {saving ? 'Saving…' : editing ? 'Update Master' : 'Add Master'}
          </button>
        </form>
      </Modal>

      <ConfirmDialog open={!!confirmId} onClose={() => setConfirmId(null)} onConfirm={handleDelete} title="Delete Master" message="This master profile and their Cloudinary photo will be permanently removed." confirmLabel="Delete" />
    </AdminDashboardLayout>
  );
};

const Field = ({ label, value, onChange, type = 'text', required }) => (
  <div>
    <label className="text-xs text-slate-400 mb-1.5 block">{label}</label>
    <input type={type} required={required} value={value ?? ''} onChange={(e) => onChange(e.target.value)} className="w-full bg-ink-950 border border-parchment-100/10 rounded-sm px-4 py-2.5 text-sm text-parchment-100 focus:border-brass-500 outline-none" />
  </div>
);

export default AdminMasters;
