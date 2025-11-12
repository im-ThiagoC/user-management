"use client";

import React from 'react';
import { Profile } from '@/types';

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

interface UserFiltersProps {
	profiles: Profile[];
	selectedProfile: string;
	setSelectedProfile: (id: string) => void;
	searchId: string;
	setSearchId: (id: string) => void;
	openCreateModal: () => void;
}

export const UserFilters: React.FC<UserFiltersProps> = ({
	profiles,
	selectedProfile,
	setSelectedProfile,
	searchId,
	setSearchId,
	openCreateModal,
}) => {
	return (
		<div className="rounded-lg shadow-sm p-6 mb-6">
			<div className="flex flex-wrap gap-4 items-end">
				<div className="flex-1 min-w-[200px] space-y-2">
					<Label>Filter by Profile</Label>
					<Select value={selectedProfile} onValueChange={setSelectedProfile}>
						<SelectTrigger>
							<SelectValue placeholder="All Profiles" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Profiles</SelectItem>
							{profiles && profiles.map(profile => (
								<SelectItem key={profile.id} value={profile.id}>{profile.name}</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className="flex-1 min-w-[200px] space-y-2">
					<Label>Search by ID</Label>
					<Input
						type="text"
						value={searchId}
						onChange={(e) => setSearchId(e.target.value)}
						placeholder="Enter user ID"
					/>
				</div>

				<Button
					onClick={openCreateModal}
				>
					+ Create User
				</Button>
			</div>
		</div>
	);
};