export interface Profile {
	id: 	string;
	name: string;
}

export interface User {
	id: 				string;
	firstName: 	string;
	lastName: 	string;
	email: 			string;
	isActive: 	boolean;
	profileId: 	string;
}

export interface UserWithProfile extends User {
	profile?: Profile;
}

export interface CreateUserData {
	firstName: 	string;
	lastName: 	string;
	email: 			string;
	isActive: 	boolean;
	profileId: 	string;
}

export interface UpdateUserData extends CreateUserData {
	id: string;
}

export interface CreateProfileData {
	name: string;
}

export interface UpdateProfileData extends CreateProfileData {
	id: string;
}

export type UserFormData = Omit<User, 'id'> | Omit<User, 'id' | 'isActive'>;