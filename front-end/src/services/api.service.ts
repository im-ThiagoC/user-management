import { User, Profile, UserFormData } from '@/types';

const API_BASE_URL = 'http://localhost:3001';

export const api = {
	// User related API calls
	users: {
		// GET /users
		getAll: async (profileId?: string): Promise<User[]> => {
			const url = profileId ? `${API_BASE_URL}/users?profileId=${profileId}` : `${API_BASE_URL}/users`;
			const res = await fetch(url);
			if (!res.ok) throw new Error('Failed to fetch users');
			return res.json();
		},

		// POST /users
		create: async (data: UserFormData): Promise<User> => {
			const res = await fetch(`${API_BASE_URL}/users`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});
			if (!res.ok) throw new Error('Failed to create user');
			return res.json();
		},

		// PUT /users/:id
		update: async (id: string, data: Partial<UserFormData>): Promise<User> => {
			const res = await fetch(`${API_BASE_URL}/users/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});
			if (!res.ok) throw new Error('Failed to update user');
			return res.json();
		},

		// DELETE /users/:id
		delete: async (id: string): Promise<void> => {
			const res = await fetch(`${API_BASE_URL}/users/${id}`, { method: 'DELETE' });
			if (!res.ok) throw new Error('Failed to delete user');
		},

		// GET /users/:id
		getById: async (id: string): Promise<User> => {
			const res = await fetch(`${API_BASE_URL}/users/${id}`);
			if (!res.ok) throw new Error('Failed to fetch user');
			return res.json();
		},

		// PATCH /users/:id/toggle-status
		toggleStatus: async (id: string): Promise<User> => {
			const user = await api.users.getById(id);
			const newStatus = !user.isActive;
			
			const res = await fetch(`${API_BASE_URL}/users/${id}/toggle-status`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ isActive: newStatus }),
			});

			if (!res.ok) throw new Error('Failed to toggle status');

			return res.json();
		},
	},

	// Profile related API calls
	profiles: {
		// GET /profiles
		getAll: async (): Promise<Profile[]> => {
			const res = await fetch(`${API_BASE_URL}/profiles`);
			if (!res.ok) throw new Error('Failed to fetch profiles');
			return res.json();
		},

		// GET /profiles/:id
		getById: async (id: string): Promise<Profile> => {
			const res = await fetch(`${API_BASE_URL}/profiles/${id}`);
			if (!res.ok) throw new Error('Failed to fetch profile');
			return res.json();
		}
	},
};