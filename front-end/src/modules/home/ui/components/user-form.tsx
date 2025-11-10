// src/components/UserForm.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { User, Profile, UserFormData } from '@/types';

// UI Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
	Select, 
	SelectContent, 
	SelectItem, 
	SelectTrigger, 
	SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

interface UserFormProps {
 profiles: Profile[];
 initialData: User | null;
 onSubmit: (data: UserFormData) => void;
 isLoading: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({ profiles, initialData, onSubmit, isLoading }) => {
 const isEditing = !!initialData;
 
	const [formData, setFormData] = useState<{
		firstName: string;
		lastName: string;
		email: string;
		isActive: boolean;
		profileId: string;
	}>({
		firstName: '',
		lastName: '',
		email: '',
		isActive: true,
		profileId: profiles[0]?.id || '',
	});

 useEffect(() => {
	if (initialData) {
	 setFormData({
		firstName: 	initialData.firstName,
		lastName: 	initialData.lastName,
		email: 			initialData.email,
		isActive: 	initialData.isActive,
		profileId: 	initialData.profileId,
	 });
	} else {
			setFormData({ 
				firstName: '', lastName: '', email: '', isActive: true, profileId: profiles[0]?.id || '' 
			});
	}
 }, [initialData, profiles]);

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	const { name, value } = e.target;
	setFormData(prev => ({ ...prev, [name]: value }));
 };
		
	const handleSelectChange = (value: string) => {
		setFormData(prev => ({ ...prev, profileId: value }));
	};

	const handleCheckboxChange = (checked: boolean) => {
		setFormData(prev => ({ ...prev, isActive: checked }));
	};

 const handleSubmit = (e: React.FormEvent) => {
	e.preventDefault();
	
	if (!formData.firstName || !formData.lastName || !formData.email || !formData.profileId) {
	 toast.error('Please fill in all required fields.');
	 return;
	}
	
	onSubmit(formData);
 };

 return (
	<form onSubmit={handleSubmit} className="space-y-4">
	 <div className="space-y-2">
		<Label htmlFor="firstName">First Name *</Label>
		<Input 
						id="firstName" type="text" name="firstName" 
						value={formData.firstName} onChange={handleChange} required
				/>
	 </div>
	 <div className="space-y-2">
		<Label htmlFor="lastName">Last Name *</Label>
		<Input 
						id="lastName" type="text" name="lastName" 
						value={formData.lastName} onChange={handleChange} required
				/>
	 </div>
	 <div className="space-y-2">
		<Label htmlFor="email">Email *</Label>
		<Input 
						id="email" type="email" name="email" 
						value={formData.email} onChange={handleChange} required
				/>
	 </div>
	 <div className="space-y-2">
		<Label htmlFor="profileId">Profile *</Label>
		<Select name="profileId" value={formData.profileId} onValueChange={handleSelectChange} required>
						<SelectTrigger id="profileId">
								<SelectValue placeholder="Select a profile" />
						</SelectTrigger>
						<SelectContent>
								{profiles.map(profile => (
										<SelectItem key={profile.id} value={profile.id}>
												{profile.name}
										</SelectItem>
								))}
						</SelectContent>
		</Select>
	 </div>
			<div className="flex items-center space-x-2 pt-2">
				<Checkbox 
						id="isActive" 
						checked={formData.isActive} 
						onCheckedChange={handleCheckboxChange}
				/>
				<Label htmlFor="isActive" className="text-sm font-medium leading-none ">User is active</Label>
			</div>

	 <div className="flex justify-start pt-4">
		<Button
		 type="submit"
		 disabled={isLoading}
		>
		 {isLoading ? 'Saving...' : isEditing ? 'Update User' : 'Create User'}
		</Button>
	 </div>
	</form>
 );
};