import api from './api';

export const adminService = {
  // Dashboard
  getOverview: () => api.get('/dashboard/overview'),

  // Students
  getStudents: (params) => api.get('/students', { params }),
  getStudent: (id) => api.get(`/students/${id}`),
  createStudent: (payload) => api.post('/students', payload),
  updateStudent: (id, payload) => api.put(`/students/${id}`, payload),
  deactivateStudent: (id) => api.delete(`/students/${id}`),
  assignProgram: (id, payload) => api.post(`/students/${id}/programs`, payload),
  getStudentRequests: (params) => api.get('/students/requests', { params }),
  approveStudentRequest: (id) => api.post(`/students/requests/${id}/approve`),
  rejectStudentRequest: (id) => api.post(`/students/requests/${id}/reject`),

  // Masters
  getMastersAdmin: () => api.get('/masters/admin'),
  createMaster: (formData) => api.post('/masters', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateMaster: (id, formData) => api.put(`/masters/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteMaster: (id) => api.delete(`/masters/${id}`),
  reorderMasters: (items) => api.put('/masters/reorder', { items }),

  // Programs
  getProgramsAdmin: () => api.get('/programs/admin'),
  createProgram: (payload) => api.post('/programs', payload),
  updateProgram: (id, payload) => api.put(`/programs/${id}`, payload),
  deleteProgram: (id) => api.delete(`/programs/${id}`),

  // Achievements
  getAchievementsAdmin: () => api.get('/achievements/admin'),
  createAchievement: (payload) => api.post('/achievements', payload),
  updateAchievement: (id, payload) => api.put(`/achievements/${id}`, payload),
  deleteAchievement: (id) => api.delete(`/achievements/${id}`),

  // Gallery
  getGalleryAdmin: () => api.get('/gallery/admin'),
  createGalleryItem: (formData) => api.post('/gallery', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateGalleryItem: (id, payload) => api.put(`/gallery/${id}`, payload),
  deleteGalleryItem: (id) => api.delete(`/gallery/${id}`),
  reorderGallery: (items) => api.put('/gallery/reorder', { items }),

  // Announcements
  getAnnouncementsAdmin: () => api.get('/announcements/admin'),
  createAnnouncement: (formData) => api.post('/announcements', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateAnnouncement: (id, formData) => api.put(`/announcements/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteAnnouncement: (id) => api.delete(`/announcements/${id}`),

  // Events
  getEventsAdmin: () => api.get('/events/admin'),
  createEvent: (payload) => api.post('/events', payload),
  updateEvent: (id, payload) => api.put(`/events/${id}`, payload),
  closeEventRegistration: (id) => api.patch(`/events/${id}/close-registration`),
  archiveEvent: (id) => api.patch(`/events/${id}/archive`),
  deleteEvent: (id) => api.delete(`/events/${id}`),

  // Testimonials
  getTestimonialsAdmin: () => api.get('/testimonials/admin'),
  createTestimonial: (payload) => api.post('/testimonials', payload),
  updateTestimonial: (id, payload) => api.put(`/testimonials/${id}`, payload),
  deleteTestimonial: (id) => api.delete(`/testimonials/${id}`),

  // FAQs
  getFaqsAdmin: () => api.get('/faqs/admin'),
  createFaq: (payload) => api.post('/faqs', payload),
  updateFaq: (id, payload) => api.put(`/faqs/${id}`, payload),
  deleteFaq: (id) => api.delete(`/faqs/${id}`),

  // Attendance
  markAttendance: (payload) => api.post('/attendance', payload),
  getStudentAttendance: (studentId, month) => api.get(`/attendance/student/${studentId}`, { params: month ? { month } : {} }),

  // Fees
  getFees: (params) => api.get('/fees', { params }),
  upsertFee: (payload) => api.post('/fees', payload),
  updateFeeStatus: (id, payload) => api.patch(`/fees/${id}/status`, payload),

  // Settings
  updateSetting: (key, value) => api.put(`/settings/${key}`, value),
  uploadPaymentQr: (formData) => api.post('/settings/payment-qr', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
};
