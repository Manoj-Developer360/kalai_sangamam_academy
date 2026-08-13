import React, { useEffect, useState } from 'react';
import AdminDashboardLayout from '../../layouts/AdminDashboardLayout.jsx';
import AdminPageHeader from '../../components/dashboard/admin/AdminPageHeader.jsx';
import DataTable from '../../components/dashboard/admin/DataTable.jsx';
import { ErrorState } from '../../components/common/StateViews.jsx';
import { adminService } from '../../services/adminService';
import { useToast } from '../../context/ToastContext.jsx';

const statusStyles = {
  paid: 'text-brass-400 border-brass-500/30',
  pending: 'text-maroon-400 border-maroon-500/30',
  partially_paid: 'text-slate-300 border-slate-500/30',
  overdue: 'text-maroon-300 border-maroon-600/40',
};

const AdminFees = () => {
  const { showToast } = useToast();
  const [students, setStudents] = useState(null);
  const [fees, setFees] = useState(null);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({ student_id: '', month: '', fee_amount: '', paid_amount: '', payment_date: '', payment_note: '' });
  const [saving, setSaving] = useState(false);

  const loadFees = () => adminService.getFees().then(({ data }) => setFees(data.data)).catch(() => setError(true));

  useEffect(() => {
    adminService.getStudents({ status: 'active' }).then(({ data }) => setStudents(data.data)).catch(() => setError(true));
    loadFees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.student_id || !form.month || form.fee_amount === '') {
      showToast('Student, month and fee amount are required.', 'error');
      return;
    }
    setSaving(true);
    try {
      await adminService.upsertFee(form);
      showToast('Fee record saved. Student dashboard will reflect this immediately.');
      setForm({ student_id: '', month: '', fee_amount: '', paid_amount: '', payment_date: '', payment_note: '' });
      loadFees();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to save fee record.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminDashboardLayout>
      <AdminPageHeader title="Fees" subtitle="Record fee amounts and verify payments per student, per month." />

      {error && <ErrorState message="Couldn't load fee data right now." />}

      <div className="grid lg:grid-cols-[1fr_1.6fr] gap-6">
        <form onSubmit={handleSubmit} className="card p-6 space-y-4 h-fit">
          <div>
            <label className="text-xs text-slate-400 mb-1.5 block">Student</label>
            <select required value={form.student_id} onChange={(e) => setForm({ ...form, student_id: e.target.value })} className="w-full bg-ink-950 border border-parchment-100/10 rounded-sm px-4 py-2.5 text-sm text-parchment-100 focus:border-brass-500 outline-none">
              <option value="">Select a student</option>
              {students?.map((s) => <option key={s.id} value={s.id}>{s.full_name} ({s.student_code})</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-1.5 block">Month (e.g. August 2026)</label>
            <input required value={form.month} onChange={(e) => setForm({ ...form, month: e.target.value })} className="w-full bg-ink-950 border border-parchment-100/10 rounded-sm px-4 py-2.5 text-sm text-parchment-100 focus:border-brass-500 outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 mb-1.5 block">Fee Amount</label>
              <input required type="number" value={form.fee_amount} onChange={(e) => setForm({ ...form, fee_amount: e.target.value })} className="w-full bg-ink-950 border border-parchment-100/10 rounded-sm px-4 py-2.5 text-sm text-parchment-100 focus:border-brass-500 outline-none" />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1.5 block">Paid Amount</label>
              <input type="number" value={form.paid_amount} onChange={(e) => setForm({ ...form, paid_amount: e.target.value })} className="w-full bg-ink-950 border border-parchment-100/10 rounded-sm px-4 py-2.5 text-sm text-parchment-100 focus:border-brass-500 outline-none" />
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-1.5 block">Payment Date</label>
            <input type="date" value={form.payment_date} onChange={(e) => setForm({ ...form, payment_date: e.target.value })} className="w-full bg-ink-950 border border-parchment-100/10 rounded-sm px-4 py-2.5 text-sm text-parchment-100 focus:border-brass-500 outline-none" />
          </div>
          {/* <div>
            <label className="text-xs text-slate-400 mb-1.5 block">Payment Note</label>
            <input value={form.payment_note} onChange={(e) => setForm({ ...form, payment_note: e.target.value })} className="w-full bg-ink-950 border border-parchment-100/10 rounded-sm px-4 py-2.5 text-sm text-parchment-100 focus:border-brass-500 outline-none" />
          </div> */}
          <p className="text-xs text-slate-500">Status (Paid / Pending / Partially Paid) is calculated automatically from the amounts entered.</p>
          <button type="submit" disabled={saving} className="btn-primary w-full disabled:opacity-60">{saving ? 'Saving…' : 'Save Fee Record'}</button>
        </form>

        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-3">All Fee Records</p>
          {fees && (
            <DataTable
              columns={[
                { key: 'student', label: 'Student', render: (r) => r.students?.full_name || '—' },
                { key: 'month', label: 'Month' },
                { key: 'fee_amount', label: 'Fee', render: (r) => `₹${r.fee_amount}` },
                { key: 'paid_amount', label: 'Paid', render: (r) => `₹${r.paid_amount}` },
                {key: 'payment_date', label: 'Payment Date', render: (r) => r.payment_date ? new Date(r.payment_date).toLocaleDateString() : '—' },
                { key: 'status', label: 'Status', render: (r) => <span className={`capitalize text-xs px-2.5 py-1 rounded-full border ${statusStyles[r.status]}`}>{r.status?.replace('_', ' ')}</span> },
              ]}
              rows={fees}
              emptyMessage="No fee records yet."
            />
          )}
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminFees;
