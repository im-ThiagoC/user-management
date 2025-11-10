"use client";

import { useState, useEffect, useCallback } from 'react';

import { api } from '@/services/api.service';
import { User, Profile, UserWithProfile, UserFormData } from '@/types';
import { UserFilters } from './user-filters';
import { UserTable } from './user-table';
import { UserForm } from './user-form';

// UI Components
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

export default function UserManagement() {
	const [users, setUsers] = useState<User[]>([]);
	const [profiles, setProfiles] = useState<Profile[]>([]);
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const [selectedProfile, setSelectedProfile] = useState<string>('all');
	const [searchId, setSearchId] = useState('');

	// Dialog states
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [editingUser, setEditingUser] = useState<User | null>(null);

	const loadData = useCallback(async () => {
		try {
			setLoading(true);
			const [usersData, profilesData] = await Promise.all([
				api.users.getAll(selectedProfile === 'all' ? undefined : selectedProfile),
				api.profiles.getAll(),
			]);
			setUsers(usersData);
			setProfiles(profilesData);
			setError(null);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to load data');
		} finally {
			setLoading(false);
		}
	}, [selectedProfile]);

	useEffect(() => {
		loadData();
	}, [loadData]);

	const getUsersWithProfiles = useCallback((): UserWithProfile[] => {
		return users.map(user => ({
			...user,
			profile: profiles.find(p => p.id === user.profileId),
		}));
	}, [users, profiles]);

	const getFilteredUsers = useCallback((): UserWithProfile[] => {
		let filtered = getUsersWithProfiles();

		if (searchId) {
			filtered = filtered.filter(u => u.id.toLowerCase().includes(searchId.toLowerCase()));
		}

		return filtered;
	}, [getUsersWithProfiles, searchId]);

	const openCreateDialog = () => {
		setEditingUser(null);
		setIsDialogOpen(true);
	};

	const openEditDialog = (user: User) => {
		setEditingUser(user);
		setIsDialogOpen(true);
	};

	const handleDialogClose = (open: boolean) => {
		if (!open) {
			setEditingUser(null);
		}
		setIsDialogOpen(open);
	};

	const handleSubmit = async (formData: UserFormData) => {
		setSubmitting(true);
		try {
			if (editingUser) {
				await api.users.update(editingUser.id, formData);
			} else {
				await api.users.create(formData);
			}
			await loadData();
			handleDialogClose(false);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : 'Failed to submit user data');
		} finally {
			setSubmitting(false);
		}
	};

	const handleDelete = async (id: string) => {
		if (!confirm('Are you sure you want to delete this user?')) return;
		try {
			await api.users.delete(id);
			await loadData();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : 'Failed to delete user');
		}
	};

	const handleToggleStatus = async (id: string) => {
		try {
			await api.users.toggleStatus(id);
			await loadData();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : 'Failed to toggle user status');
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-xl">Loading...</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen py-8 px-4">
			<div className="max-w-7xl mx-auto">

				{error && (
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
						{error}
					</div>
				)}

				<UserFilters
					profiles={profiles}
					selectedProfile={selectedProfile}
					setSelectedProfile={setSelectedProfile}
					searchId={searchId}
					setSearchId={setSearchId}
					openCreateModal={openCreateDialog}
				/>

				<UserTable
					users={getFilteredUsers()}
					onEdit={openEditDialog}
					onDelete={handleDelete}
					onToggleStatus={handleToggleStatus}
				/>

				<Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle className="text-[#0A2342] font-bold">
								{editingUser ? 'Edit User' : 'Create New User'}
							</DialogTitle>
						</DialogHeader>
						<UserForm
							profiles={profiles}
							initialData={editingUser}
							onSubmit={handleSubmit}
							isLoading={submitting}
						/>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}