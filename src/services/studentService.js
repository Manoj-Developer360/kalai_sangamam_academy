import api from './api';

export const studentService = {
  getMyProfile: () => api.get('/students/me/profile'),
  getMyAttendance: (month) => api.get('/attendance/me', { params: month ? { month } : {} }),
  getMyFees: () => api.get('/fees/me'),
};
