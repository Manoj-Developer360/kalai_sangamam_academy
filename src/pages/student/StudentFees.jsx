import React, { useEffect, useState } from 'react';
import { FiCreditCard } from 'react-icons/fi';
import StudentDashboardLayout from '../../layouts/StudentDashboardLayout.jsx';
import { EmptyState, ErrorState } from '../../components/common/StateViews.jsx';
import { studentService } from '../../services/studentService';
import { publicService } from '../../services/publicService';

const statusStyles = {
  paid: 'bg-brass-500/15 text-brass-400 border-brass-500/30',
  pending: 'bg-maroon-500/15 text-maroon-400 border-maroon-500/30',
  partially_paid: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
  overdue: 'bg-maroon-600/20 text-maroon-300 border-maroon-600/40',
};

const StudentFees = () => {
  const [fees, setFees] = useState(null);
  const [error, setError] = useState(false);
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    studentService.getMyFees().then(({ data }) => setFees(data.data)).catch(() => setError(true));
    publicService.getPaymentSettings().then(({ data }) => setPayment(data.data)).catch(() => {});
  }, []);

  const current = fees?.[0];

  return (
    <StudentDashboardLayout>
      <h1 className="section-heading !text-2xl lg:!text-3xl mb-1">Fees</h1>
      <p className="text-slate-500 text-sm mb-8">Your fee status is updated by the academy after payment verification.</p>

      {error && <ErrorState message="Couldn't load fee details right now." />}

      {fees && (
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6">
          <div>
            {current && (
              <div className="card p-6 mb-6">
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-3">Current Month — {current.month}</p>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-lg font-mono text-parchment-100">₹{current.fee_amount}</p>
                    <p className="text-xs text-slate-500">Fee Amount</p>
                  </div>
                  <div>
                    <p className="text-lg font-mono text-brass-400">₹{current.paid_amount}</p>
                    <p className="text-xs text-slate-500">Paid</p>
                  </div>
                  <div>
                    <p className="text-lg font-mono text-maroon-400">₹{current.pending_amount}</p>
                    <p className="text-xs text-slate-500">Pending</p>
                  </div>
                </div>
                <span className={`inline-block text-xs px-3 py-1 rounded-full border capitalize ${statusStyles[current.status]}`}>
                  {current.status?.replace('_', ' ')}
                </span>
              </div>
            )}

            <p className="text-xs text-slate-500 uppercase tracking-wide mb-3">Payment History</p>
            {fees.length === 0 ? (
              <EmptyState message="No fee records yet." />
            ) : (
              <div className="card overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-slate-500 text-xs uppercase border-b border-parchment-100/5">
                      <th className="p-4">Month</th>
                      <th className="p-4">Fee</th>
                      <th className="p-4">Paid</th>
                      <th className="p-4">Payment Date</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fees.map((f) => (
                      <tr key={f.id} className="border-b border-parchment-100/5 last:border-0">
                        <td className="p-4 text-parchment-200">{f.month}</td>
                        <td className="p-4 text-slate-300">₹{f.fee_amount}</td>
                        <td className="p-4 text-slate-300">₹{f.paid_amount}</td>
                        <td className="p-4 text-slate-300">{f.payment_date ? new Date(f.payment_date).toLocaleDateString() : '—'}</td>
                        <td className={`p-4 capitalize text-xs`}><span className={`px-2.5 py-1 rounded-full border ${statusStyles[f.status]}`}>{f.status?.replace('_', ' ')}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="card p-6 h-fit">
            <div className="flex items-center gap-2 mb-4">
              <FiCreditCard className="text-brass-500" />
              <p className="font-display text-parchment-100">Online Payment</p>
            </div>
            {payment?.upi_qr_url ? (
              <img src={payment.upi_qr_url} alt="Payment QR Code" className="w-full rounded-md mb-4" />
            ) : (
              <div className="h-40 bg-ink-700 rounded-md flex items-center justify-center text-slate-500 text-xs mb-4">
                QR code not configured yet
              </div>
            )}
            <p className="text-xs text-slate-500 mb-1">Scan QR Code to Pay</p>
            {payment?.payment_number && (
              <p className="text-sm text-parchment-200 font-mono mt-3">Payment Number: {payment.payment_number}</p>
            )}
            <p className="text-xs text-slate-500 mt-4 leading-relaxed">
              After payment, the academy will manually verify and update your fee status here.
            </p>
          </div>
        </div>
      )}
    </StudentDashboardLayout>
  );
};

export default StudentFees;
