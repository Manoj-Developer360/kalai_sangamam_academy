import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import { studentService } from '../../services/studentService';

const emptyForm = {
  username: '', password: '', email: '', full_name: '', date_of_birth: '',
  gender: '', parent_name: '', parent_contact: '', contact_number: '',
  address: '', blood_group: '', emergency_contact: '', joining_date: '',
};

const StudentRegister = () => {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await studentService.register(form);
      setSubmitted(true);
      setForm(emptyForm);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit registration request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink-950 px-4 py-10 sm:py-14">
      <div className="mx-auto w-full max-w-3xl">
        <Link to="/student/login" className="flex items-center gap-2 text-slate-400 text-sm mb-8 hover:text-brass-400">
          <FiArrowLeft /> Back to student login
        </Link>

        <div className="card p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-8">
              <FiCheckCircle className="mx-auto text-4xl text-brass-500 mb-4" />
              <h1 className="font-display text-2xl text-parchment-100 mb-2">Request Submitted</h1>
              <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
                Your registration request has been sent to the admin. You can sign in after the admin approves your account.
              </p>
              <Link to="/student/login" className="btn-primary">
                Go to Login
              </Link>
            </div>
          ) : (
            <>
              <h1 className="font-display text-2xl text-parchment-100 mb-1">Student Registration</h1>
              <p className="text-slate-500 text-sm mb-6">Submit your details for admin approval.</p>

              <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
                <Field label="Username" value={form.username} onChange={(value) => updateField('username', value)} required />
                <Field label="Password" type="password" value={form.password} onChange={(value) => updateField('password', value)} required />
                <Field label="Email" type="email" value={form.email} onChange={(value) => updateField('email', value)} />
                <Field label="Full Name" value={form.full_name} onChange={(value) => updateField('full_name', value)} required />
                <Field label="Date of Birth" type="date" value={form.date_of_birth} onChange={(value) => updateField('date_of_birth', value)} />
                <Field label="Gender" value={form.gender} onChange={(value) => updateField('gender', value)} />
                <Field label="Parent Name" value={form.parent_name} onChange={(value) => updateField('parent_name', value)} />
                <Field label="Parent Contact" value={form.parent_contact} onChange={(value) => updateField('parent_contact', value)} />
                <Field label="Contact Number" value={form.contact_number} onChange={(value) => updateField('contact_number', value)} />
                <Field label="Blood Group" value={form.blood_group} onChange={(value) => updateField('blood_group', value)} />
                <Field label="Emergency Contact" value={form.emergency_contact} onChange={(value) => updateField('emergency_contact', value)} />
                <Field label="Joining Date" type="date" value={form.joining_date} onChange={(value) => updateField('joining_date', value)} />
                <Field label="Address" value={form.address} onChange={(value) => updateField('address', value)} className="sm:col-span-2" />

                {error && <p className="sm:col-span-2 text-maroon-400 text-xs">{error}</p>}

                <button type="submit" disabled={loading} className="btn-primary sm:col-span-2 disabled:opacity-60">
                  {loading ? 'Submitting...' : 'Submit Registration Request'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, value, onChange, type = 'text', required, className = '' }) => (
  <div className={className}>
    <label className="text-xs text-slate-400 mb-1.5 block">{label}</label>
    <input
      type={type}
      required={required}
      value={value || ''}
      onChange={(event) => onChange(event.target.value)}
      className="w-full bg-ink-950 border border-parchment-100/10 rounded-sm px-4 py-2.5 text-sm text-parchment-100 focus:border-brass-500 outline-none"
    />
  </div>
);

export default StudentRegister;
