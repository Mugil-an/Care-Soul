import api from './api.js';
// api.js already has the base URL and JWT token injection

export const notificationService = {

    // Send a notification (usually called from other services)
    sendNotification: async (data) => {
        const response = await api.post('/notifications/send', data);
        return response.data;
    },

    // Get notifications for current user
    getMyNotifications: async () => {
        const response = await api.get('/notifications/user/me');
        return response.data;
    },

    // Mark single notification as read
    markAsRead: async (notificationId) => {
        const response = await api.put(`/notifications/${notificationId}/read`);
        return response.data;
    },

    // Mark all as read
    markAllAsRead: async () => {
        const response = await api.put('/notifications/read-all');
        return response.data;
    }
};