// services/api.service.ts
import {
	ApiResponse,
	User,
	Profile,
	CreateUserData,
	UpdateUserData,
	CreateProfileData,
	UpdateProfileData,
	IUserService,
	IProfileService,
	UserFormData,
} from '@/types';

// Base API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Helper to handle API requests
async function fetchApi<T>(
	endpoint: string,
	options?: RequestInit
): Promise<ApiResponse<T>> {
	const url = `${API_BASE_URL}${endpoint}`;
	console.log(`📡 API Request: ${options?.method || 'GET'} ${url}`);
	
	const response = await fetch(url, {
		headers: {
			'Content-Type': 'application/json',
			...options?.headers,
		},
		...options,
	});

	console.log(`📡 API Response: ${response.status} ${response.statusText}`);

	if (!response.ok) {
		const error = await response.json().catch(() => ({ 
			message: `HTTP ${response.status}: ${response.statusText}` 
		}));
		console.error('❌ API Error:', error);
		throw new Error(error.message || `HTTP ${response.status}`);
	}

	// Tratar respostas sem conteúdo (DELETE, 204, etc)
	const contentType = response.headers.get('content-type');
	const contentLength = response.headers.get('content-length');
	
	if (
		response.status === 204 || 
		contentLength === '0' ||
		!contentType?.includes('application/json')
	) {
		console.log('✅ API Success: No content');
		return {
			data: null as T,
			success: true,
			timestamp: new Date().toISOString(),
		};
	}

	// Resposta com JSON
	const data = await response.json();
	console.log('✅ API Success:', data);
	return data;
}
// ============================================
// User Service
// ============================================
const users: IUserService = {
	getAll: (profileId?: string) => {
		const params = profileId ? `?profileId=${profileId}` : '';
		return fetchApi<User[]>(`/users${params}`);
	},

	getById: (id: string) => {
		return fetchApi<User>(`/users/${id}`);
	},

	create: (data: CreateUserData) => {
		return fetchApi<User>('/users', {
			method: 'POST',
			body: JSON.stringify(data),
		});
	},

	update: (id: string, data: UserFormData) => {
		return fetchApi<User>(`/users/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});
	},

	delete: (id: string) => {
		return fetchApi<void>(`/users/${id}`, {
			method: 'DELETE',
		});
	},

	toggleStatus: (id: string) => {
		return fetchApi<User>(`/users/${id}/toggle-status`, {
			method: 'PATCH',
		});
	},
};

// ============================================
// Profile Service
// ============================================
const profiles: IProfileService = {
	getAll: () => {
		return fetchApi<Profile[]>('/profiles');
	},

	getById: (id: string) => {
		return fetchApi<Profile>(`/profiles/${id}`);
	},

	create: (data: CreateProfileData) => {
		return fetchApi<Profile>('/profiles', {
			method: 'POST',
			body: JSON.stringify(data),
		});
	},

	update: (id: string, data: UpdateProfileData) => {
		return fetchApi<Profile>(`/profiles/${id}`, {
			method: 'PUT',
			body: JSON.stringify(data),
		});
	},

	delete: (id: string) => {
		return fetchApi<void>(`/profiles/${id}`, {
			method: 'DELETE',
		});
	},
};

// ============================================
// Export
// ============================================
export const api = {
	users,
	profiles,
};