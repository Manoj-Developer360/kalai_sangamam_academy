import React, { useEffect, useState } from 'react';
import AdminDashboardLayout from '../../layouts/AdminDashboardLayout.jsx';
import AdminPageHeader from '../../components/dashboard/admin/AdminPageHeader.jsx';
import DataTable from '../../components/dashboard/admin/DataTable.jsx';
import Modal from '../../components/dashboard/admin/Modal.jsx';
import ConfirmDialog from '../../components/dashboard/admin/ConfirmDialog.jsx';
import { SkeletonGrid, ErrorState } from '../../components/common/StateViews.jsx';
import { adminService } from '../../services/adminService';
import { useToast } from '../../context/ToastContext.jsx';

const emptyForm = {
  username: '', password: '', email: '', full_name: '', date_of_birth: '',
  gender: '', parent_name: '', parent_contact: '', contact_number: '',
  address: '', blood_group: '', emergency_contact: '', joining_date: '',
};

const AdminStudents = () => {
  const { showToast } = useToast();
  const [students, setStudents] = useState(null);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [confirmId, setConfirmId] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    adminService.getStudents(search ? { search } : {}).then(({ data }) => setStudents(data.data)).catch(() => setError(true));
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [search]);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (s) => {
    setEditing(s);
    setForm({ ...emptyForm, ...s, username: s.users?.username || '' });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await adminService.updateStudent(editing.id, form);
        showToast('Student updated successfully.');
      } else {
        await adminService.createStudent(form);
        showToast('Student created successfully.');
      }
      setModalOpen(false);
      load();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to save student.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDeactivate = async () => {
    try {
      await adminService.deactivateStudent(confirmId);
      showToast('Student deactivated.');
      setConfirmId(null);
      load();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to deactivate student.', 'error');
    }
  };

  return (
    <AdminDashboardLayout>
      <AdminPageHeader title="Students" subtitle="Manage student accounts, profiles and enrolments." actionLabel="Add Student" onAction={openCreate} />

      <input
        placeholder="Search by name…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full sm:w-72 bg-ink-900 border border-parchment-100/10 rounded-sm px-4 py-2.5 text-sm text-parchment-100 focus:border-brass-500 outline-none"
      />

      {!students && !error && <SkeletonGrid count={4} />}
      {error && <ErrorState message="Couldn't load students right now." />}

      {students && (
        <DataTable
          columns={[
            { key: 'student_code', label: 'ID' },
            { key: 'full_name', label: 'Name' },
            { key: 'contact_number', label: 'Contact' },
            { key: 'status', label: 'Status', render: (r) => <span className={`capitalize text-xs px-2.5 py-1 rounded-full border ${r.status === 'active' ? 'border-brass-500/30 text-brass-400' : 'border-slate-500/30 text-slate-400'}`}>{r.status}</span> },
          ]}
          rows={students}
          emptyMessage="No students found."
          actions={(r) => (
            <>
              <button onClick={() => openEdit(r)} className="text-brass-400 text-xs hover:underline">Edit</button>
              <button onClick={() => setConfirmId(r.id)} className="text-maroon-400 text-xs hover:underline">Deactivate</button>
            </>
          )}
        />
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Student' : 'Add Student'} maxWidth="max-w-2xl">
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
          {!editing && (
            <>
              <Field label="Username" value={form.username} onChange={(v) => setForm({ ...form, username: v })} required />
              <Field label="Password" type="password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} required />
            </>
          )}
          <Field label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
          <Field label="Full Name" value={form.full_name} onChange={(v) => setForm({ ...form, full_name: v })} required />
          <Field label="Date of Birth" type="date" value={form.date_of_birth} onChange={(v) => setForm({ ...form, date_of_birth: v })} />
          <Field label="Gender" value={form.gender} onChange={(v) => setForm({ ...form, gender: v })} />
          <Field label="Parent Name" value={form.parent_name} onChange={(v) => setForm({ ...form, parent_name: v })} />
          <Field label="Parent Contact" value={form.parent_contact} onChange={(v) => setForm({ ...form, parent_contact: v })} />
          <Field label="Contact Number" value={form.contact_number} onChange={(v) => setForm({ ...form, contact_number: v })} />
          <Field label="Blood Group" value={form.blood_group} onChange={(v) => setForm({ ...form, blood_group: v })} />
          <Field label="Emergency Contact" value={form.emergency_contact} onChange={(v) => setForm({ ...form, emergency_contact: v })} />
          <Field label="Joining Date" type="date" value={form.joining_date} onChange={(v) => setForm({ ...form, joining_date: v })} />
          <Field label="Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} className="sm:col-span-2" />

          <button type="submit" disabled={saving} className="btn-primary sm:col-span-2 disabled:opacity-60">
            {saving ? 'Saving…' : editing ? 'Update Student' : 'Create Student'}
          </button>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!confirmId}
        onClose={() => setConfirmId(null)}
        onConfirm={handleDeactivate}
        title="Deactivate Student"
        message="This student will be marked inactive and lose dashboard access. This can be reversed later."
        confirmLabel="Deactivate"
      />
    </AdminDashboardLayout>
  );
};

const Field = ({ label, value, onChange, type = 'text', required, className = '' }) => (
  <div className={className}>
    <label className="text-xs text-slate-400 mb-1.5 block">{label}</label>
    <input
      type={type}
      required={required}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-ink-950 border border-parchment-100/10 rounded-sm px-4 py-2.5 text-sm text-parchment-100 focus:border-brass-500 outline-none"
    />
  </div>
);

export default AdminStudents;
