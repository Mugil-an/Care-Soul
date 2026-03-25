import api from './api.js';

export const telemedicineService = {

    // Create a video session for an appointment
    createSession: async (appointmentId) => {
        const response = await api.post('/telemedicine/create-session', { appointmentId });
        return response.data;
    },

    // Join an existing session by roomId
    joinSession: async (roomId) => {
        const response = await api.get(`/telemedicine/join/${roomId}`);
        return response.data;
    },

    // Get session for a specific appointment
    getSessionByAppointment: async (appointmentId) => {
        const response = await api.get(`/telemedicine/appointment/${appointmentId}`);
        return response.data;
    }
};