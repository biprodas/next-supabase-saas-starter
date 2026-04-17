export const API_BASE = '/api/v1';

export const ROUTES = {
	HOME: '/',
	AUTH: {
		LOGIN: '/login',
		SIGNUP: '/signup',
		LOGOUT: '/logout',
	},
	DASHBOARD: {
		ADMIN: '/admin',
		USER: '/dashboard',
	},
	API: {
		WEBHOOK: `${API_BASE}/webhook`,
		CONTACT: `${API_BASE}/contact`,
		SUBSCRIBE: `${API_BASE}/subscribe`,
	},
} as const;