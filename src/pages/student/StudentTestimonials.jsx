import React, { useEffect, useState } from 'react';
import { FiUser } from 'react-icons/fi';
import StudentDashboardLayout from '../../layouts/StudentDashboardLayout.jsx';
import { EmptyState, ErrorState, SkeletonGrid } from '../../components/common/StateViews.jsx';
import { publicService } from '../../services/publicService';

const StudentTestimonials = () => {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    publicService.getTestimonials().then(({ data }) => setItems(data.data)).catch(() => setError(true));
  }, []);

  return (
    <StudentDashboardLayout>
      <h1 className="section-heading !text-2xl lg:!text-3xl mb-1">Testimonials</h1>
      <p className="text-slate-500 text-sm mb-8">Messages shared by fellow students at the academy.</p>

      {!items && !error && <SkeletonGrid count={4} className="sm:grid-cols-2" />}
      {error && <ErrorState message="Couldn't load testimonials right now." />}
      {items && items.length === 0 && <EmptyState message="No testimonials have been shared yet." />}

      {items && items.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-5">
          {items.map((t) => (
            <div key={t.id} className="card p-6">
              <FiUser className="text-brass-500 text-xl mb-3" />
              <p className="text-parchment-200 text-sm leading-relaxed italic">&ldquo;{t.message}&rdquo;</p>
              <p className="mt-4 font-display text-parchment-100 text-sm">{t.student_name}</p>
              <p className="text-xs text-slate-500">{t.program}</p>
            </div>
          ))}
        </div>
      )}
    </StudentDashboardLayout>
  );
};

export default StudentTestimonials;
