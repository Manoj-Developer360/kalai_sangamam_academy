import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';

import Home from './pages/public/Home.jsx';
import AboutPage from './pages/public/AboutPage.jsx';
import ProgramsPage from './pages/public/ProgramsPage.jsx';
import ProgramDetailPage from './pages/public/ProgramDetailPage.jsx';
import MastersPage from './pages/public/MastersPage.jsx';
import AchievementsPage from './pages/public/AchievementsPage.jsx';
import GalleryPage from './pages/public/GalleryPage.jsx';
import EventsPage from './pages/public/EventsPage.jsx';
import ContactPage from './pages/public/ContactPage.jsx';
import NotFound from './pages/public/NotFound.jsx';

import StudentLogin from './pages/student/StudentLogin.jsx';
import StudentRegister from './pages/student/StudentRegister.jsx';
import StudentDashboardHome from './pages/student/StudentDashboardHome.jsx';
import StudentProfile from './pages/student/StudentProfile.jsx';
import StudentAttendance from './pages/student/StudentAttendance.jsx';
import StudentFees from './pages/student/StudentFees.jsx';
import StudentPrograms from './pages/student/StudentPrograms.jsx';
import StudentTestimonials from './pages/student/StudentTestimonials.jsx';
import StudentSettings from './pages/student/StudentSettings.jsx';

import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminDashboardHome from './pages/admin/AdminDashboardHome.jsx';
import AdminStudents from './pages/admin/AdminStudents.jsx';
import AdminMasters from './pages/admin/AdminMasters.jsx';
import AdminPrograms from './pages/admin/AdminPrograms.jsx';
import AdminAchievements from './pages/admin/AdminAchievements.jsx';
import AdminGallery from './pages/admin/AdminGallery.jsx';
import AdminEvents from './pages/admin/AdminEvents.jsx';
import AdminTestimonials from './pages/admin/AdminTestimonials.jsx';
import AdminFaqs from './pages/admin/AdminFaqs.jsx';
import AdminAttendance from './pages/admin/AdminAttendance.jsx';
import AdminFees from './pages/admin/AdminFees.jsx';
import AdminSettings from './pages/admin/AdminSettings.jsx';
import AdminEnquiries from './pages/admin/AdminEnquiries.jsx';

function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/programs/:slug" element={<ProgramDetailPage />} />
        <Route path="/masters" element={<MastersPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Student */}
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/register" element={<StudentRegister />} />
        <Route path="/student/dashboard" element={<ProtectedRoute role="student"><StudentDashboardHome /></ProtectedRoute>} />
        <Route path="/student/profile" element={<ProtectedRoute role="student"><StudentProfile /></ProtectedRoute>} />
        <Route path="/student/attendance" element={<ProtectedRoute role="student"><StudentAttendance /></ProtectedRoute>} />
        <Route path="/student/fees" element={<ProtectedRoute role="student"><StudentFees /></ProtectedRoute>} />
        <Route path="/student/programs" element={<ProtectedRoute role="student"><StudentPrograms /></ProtectedRoute>} />
        <Route path="/student/testimonials" element={<ProtectedRoute role="student"><StudentTestimonials /></ProtectedRoute>} />
        <Route path="/student/settings" element={<ProtectedRoute role="student"><StudentSettings /></ProtectedRoute>} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboardHome /></ProtectedRoute>} />
        <Route path="/admin/students" element={<ProtectedRoute role="admin"><AdminStudents /></ProtectedRoute>} />
        <Route path="/admin/masters" element={<ProtectedRoute role="admin"><AdminMasters /></ProtectedRoute>} />
        <Route path="/admin/programs" element={<ProtectedRoute role="admin"><AdminPrograms /></ProtectedRoute>} />
        <Route path="/admin/achievements" element={<ProtectedRoute role="admin"><AdminAchievements /></ProtectedRoute>} />
        <Route path="/admin/gallery" element={<ProtectedRoute role="admin"><AdminGallery /></ProtectedRoute>} />
        <Route path="/admin/events" element={<ProtectedRoute role="admin"><AdminEvents /></ProtectedRoute>} />
        <Route path="/admin/testimonials" element={<ProtectedRoute role="admin"><AdminTestimonials /></ProtectedRoute>} />
        <Route path="/admin/faqs" element={<ProtectedRoute role="admin"><AdminFaqs /></ProtectedRoute>} />
        <Route path="/admin/attendance" element={<ProtectedRoute role="admin"><AdminAttendance /></ProtectedRoute>} />
        <Route path="/admin/fees" element={<ProtectedRoute role="admin"><AdminFees /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute role="admin"><AdminSettings /></ProtectedRoute>} />
        <Route path="/admin/enquiries" element={<ProtectedRoute role="admin"><AdminEnquiries /></ProtectedRoute>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </ToastProvider>
  );
}

export default App;
