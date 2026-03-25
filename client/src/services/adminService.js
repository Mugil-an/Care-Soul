import api from './api.js';

export const adminService = {

    getStats: async () => {
        const response = await api.get('/admin/stats');
        return response.data;
    },

    getAllUsers: async () => {
        const response = await api.get('/admin/users');
        return response.data;
    },

    getAllAppointments: async () => {
        const response = await api.get('/admin/appointments');
        return response.data;
    },

    verifyDoctor: async (doctorId) => {
        const response = await api.put(`/admin/verify-doctor/${doctorId}`);
        return response.data;
    },

    deleteUser: async (userId) => {
        const response = await api.delete(`/admin/users/${userId}`);
        return response.data;
    }
};