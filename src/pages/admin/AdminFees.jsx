import React, { useEffect, useState } from 'react';
import AdminDashboardLayout from '../../layouts/AdminDashboardLayout.jsx';
import AdminPageHeader from '../../components/dashboard/admin/AdminPageHeader.jsx';
import DataTable from '../../components/dashboard/admin/DataTable.jsx';
import { ErrorState } from '../../components/common/StateViews.jsx';
import { adminService } from '../../services/adminService';
import { useToast } from '../../context/ToastContext.jsx';

const statusStyles = {
  paid: 'text-brass-400 border-brass-500/30', pending: 'text-maroon-400 border-maroon-500/30',
  partially_paid: 'text-slate-300 border-slate-500/30', overdue: 'text-maroon-300 border-maroon-600/40',
};
const emptyForm = { student_id: '', month: '', fee_amount: '', payment_amount: '', payment_date: '', payment_note: '' };

const AdminFees = () => {
  const { showToast } = useToast();
  const [students, setStudents] = useState(null);
  const [fees, setFees] = useState(null);
  const [error, setError] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const loadFees = () => adminService.getFees().then(({ data }) => setFees(data.data)).catch(() => setError(true));

  useEffect(() => {
    adminService.getStudents({ status: 'active' }).then(({ data }) => setStudents(data.data)).catch(() => setError(true));
    loadFees();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.student_id || !form.month || form.fee_amount === '') {
      showToast('Student, month and fee amount are required.', 'error');
      return;
    }
    setSaving(true);
    try {
      await adminService.upsertFee(form);
      showToast(form.payment_amount ? 'Payment added to the monthly fee record.' : 'Monthly fee record saved.');
      setForm(emptyForm);
      loadFees();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to save fee record.', 'error');
    } finally { setSaving(false); }
  };

  return <AdminDashboardLayout>
    <AdminPageHeader title="Fees" subtitle="One monthly fee record per student, with multiple payments supported." />
    {error && <ErrorState message="Couldn't load fee data right now." />}
    <div className="grid lg:grid-cols-[1fr_1.6fr] gap-6">
      <form onSubmit={handleSubmit} className="card p-6 space-y-4 h-fit">
        <div><label className="text-xs text-slate-400 mb-1.5 block">Student</label><select required value={form.student_id} onChange={(e) => setForm({ ...form, student_id: e.target.value })}><option value="">Select a student</option>{students?.map((student) => <option key={student.id} value={student.id}>{student.full_name} ({student.student_code})</option>)}</select></div>
        <div><label className="text-xs text-slate-400 mb-1.5 block">Month (e.g. August 2026)</label><input required value={form.month} onChange={(e) => setForm({ ...form, month: e.target.value })} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-xs text-slate-400 mb-1.5 block">Monthly Fee Amount</label><input required min="0" type="number" value={form.fee_amount} onChange={(e) => setForm({ ...form, fee_amount: e.target.value })} /></div>
          <div><label className="text-xs text-slate-400 mb-1.5 block">Payment Received Now</label><input min="0" type="number" value={form.payment_amount} onChange={(e) => setForm({ ...form, payment_amount: e.target.value })} /></div>
        </div>
        <div><label className="text-xs text-slate-400 mb-1.5 block">Payment Date</label><input type="date" value={form.payment_date} onChange={(e) => setForm({ ...form, payment_date: e.target.value })} /></div>
        <div><label className="text-xs text-slate-400 mb-1.5 block">Payment Note (optional)</label><input value={form.payment_note} onChange={(e) => setForm({ ...form, payment_note: e.target.value })} /></div>
        <p className="text-xs text-slate-500">For another instalment, submit the same student and month again. The payment is added to the existing monthly total.</p>
        <button type="submit" disabled={saving} className="btn-primary w-full disabled:opacity-60">{saving ? 'Saving...' : 'Save Fee / Add Payment'}</button>
      </form>
      <div><p className="text-xs text-slate-500 uppercase tracking-wide mb-3">Monthly Fee Records</p>{fees && <DataTable columns={[
        { key: 'student', label: 'Student', render: (row) => row.students?.full_name || '-' }, { key: 'month', label: 'Month' },
        { key: 'fee_amount', label: 'Fee', render: (row) => `Rs. ${row.fee_amount}` }, { key: 'paid_amount', label: 'Paid', render: (row) => `Rs. ${row.paid_amount}` },
        { key: 'pending_amount', label: 'Pending', render: (row) => `Rs. ${row.pending_amount}` }, { key: 'payments', label: 'Payments', render: (row) => row.payments?.length || 0 },
        { key: 'status', label: 'Status', render: (row) => <span className={`capitalize text-xs px-2.5 py-1 rounded-full border ${statusStyles[row.status]}`}>{row.status?.replace('_', ' ')}</span> },
      ]} rows={fees} emptyMessage="No fee records yet." />}</div>
    </div>
  </AdminDashboardLayout>;
};

export default AdminFees;
