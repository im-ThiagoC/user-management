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
		<div className="bg-white rounded-lg shadow-sm p-6 mb-6">
			<div className="flex flex-wrap gap-4 items-end">
				{/* Filter by Profile */}
				<div className="flex-1 min-w-[200px] space-y-2">
					<Label className="text-[#343A40]">Filter by Profile</Label>
					<Select value={selectedProfile} onValueChange={setSelectedProfile}>
						<SelectTrigger className="focus:ring-[#1B4F72] focus:ring-offset-0 border-[#6C757D]">
							<SelectValue placeholder="All Profiles" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Profiles</SelectItem>
							{profiles.map(profile => (
								<SelectItem key={profile.id} value={profile.id}>{profile.name}</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* Search by ID */}
				<div className="flex-1 min-w-[200px] space-y-2">
					<Label className="text-[#343A40]">Search by ID</Label>
					<Input
						type="text"
						value={searchId}
						onChange={(e) => setSearchId(e.target.value)}
						placeholder="Enter user ID"
						className="focus-visible:ring-[#1B4F72] focus-visible:ring-offset-0 border-[#6C757D]"
					/>
				</div>

				<Button
					onClick={openCreateModal}
					className="px-6 py-2 bg-[#1B4F72] text-[#F8F9FA] hover:bg-[#0A2342] transition-colors font-medium"
				>
					+ Create User
				</Button>
			</div>
		</div>
	);
};