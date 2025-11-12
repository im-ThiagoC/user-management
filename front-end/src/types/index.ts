// ============================================
// API Response Wrapper
// ============================================
export interface ApiResponse<T> {
	data: T;
	success: boolean;
	timestamp: string;
}

// ============================================
// Entities
// ============================================
export interface Profile {
	id: string;
	name: string;
}

export interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	isActive: boolean;
	profileId: string;
}

export interface UserWithProfile extends User {
	profile?: Profile;
}

// ============================================
// Form Data Types
// ============================================
export interface CreateUserData {
	firstName: string;
	lastName: string;
	email: string;
	isActive: boolean;
	profileId: string;
}

export interface UpdateUserData extends CreateUserData {
	id: string;
}

// UserFormData é o que vem do formulário (sem ID)
export type UserFormData = CreateUserData;

export interface CreateProfileData {
	name: string;
}

export interface UpdateProfileData extends CreateProfileData {
	id: string;
}


// ============================
// API Service Types (opcional, mas recomendado)
// ============================================
export interface IUserService {
	getAll: (profileId?: string) => Promise<ApiResponse<User[]>>;
	getById: (id: string) => Promise<ApiResponse<User>>;
	create: (data: CreateUserData) => Promise<ApiResponse<User>>;
	update: (id: string, data: UserFormData) => Promise<ApiResponse<User>>;
	delete: (id: string) => Promise<ApiResponse<void>>;
	toggleStatus: (id: string) => Promise<ApiResponse<User>>;
}

export interface IProfileService {
	getAll: () => Promise<ApiResponse<Profile[]>>;
	getById: (id: string) => Promise<ApiResponse<Profile>>;
	create: (data: CreateProfileData) => Promise<ApiResponse<Profile>>;
	update: (id: string, data: UpdateProfileData) => Promise<ApiResponse<Profile>>;
	delete: (id: string) => Promise<ApiResponse<void>>;
}