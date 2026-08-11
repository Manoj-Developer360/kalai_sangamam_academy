import api from './api';

export const publicService = {
  getPrograms: () => api.get('/programs'),
  getProgramBySlug: (slug) => api.get(`/programs/slug/${slug}`),
  getMasters: () => api.get('/masters'),
  getAchievements: () => api.get('/achievements'),
  getGallery: (category) => api.get('/gallery', { params: category ? { category } : {} }),
  getAnnouncements: () => api.get('/announcements'),
  getHeroAnnouncement: () => api.get('/announcements/hero'),
  getEvents: () => api.get('/events'),
  getTestimonials: () => api.get('/testimonials'),
  getFaqs: () => api.get('/faqs'),
  getSiteSettings: () => api.get('/settings/site_info'),
  getPaymentSettings: () => api.get('/settings/payment_info'),
};
