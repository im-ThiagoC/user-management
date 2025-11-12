"use client";

import { useState, useMemo } from "react";

// UI Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

// Hooks
import {
  useUsers,
  useProfiles,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
  useToggleUserStatus,
} from "@/components/hooks/useUsers";

// Types & Components
import { User, UserWithProfile, UserFormData } from "@/types";
import { UserFilters } from "./user-filters";
import { UserTable } from "./user-table";
import { UserForm } from "./user-form";

export default function UserManagement() {
  // State
  const [selectedProfile, setSelectedProfile] = useState("all");
  const [searchId, setSearchId] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Queries
  const profileId = selectedProfile === "all" ? undefined : selectedProfile;
  const { data: users, isLoading: usersLoading, error: usersError } = useUsers(profileId);
  const { data: profiles, isLoading: profilesLoading } = useProfiles();

  // Mutations
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();
  const toggleStatus = useToggleUserStatus();

  // Computed values
  const isLoading = usersLoading || profilesLoading;
  const error = usersError instanceof Error ? usersError.message : null;

  const usersWithProfiles = useMemo(
    (): UserWithProfile[] =>
      (users || []).map((user: User) => ({
        ...user,
        profile: (profiles || []).find((p: { id: string; }) => p.id === user.profileId),
      })),
    [users, profiles]
  );

  const filteredUsers = useMemo(() => {
    if (!searchId) return usersWithProfiles;
    return usersWithProfiles.filter((u) =>
      u.id.toLowerCase().includes(searchId.toLowerCase())
    );
  }, [usersWithProfiles, searchId]);

  // Dialog handlers
  const openCreateDialog = () => {
    setEditingUser(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (user: User) => {
    setEditingUser(user);
    setIsDialogOpen(true);
  };

  // Action handlers
  const handleSubmit = async (formData: UserFormData) => {
    try {
      if (editingUser) {
        // Update existing user - include id
        await updateUser.mutateAsync({ 
          id: editingUser.id, 
          data: formData 
        });
      } else {
        // Create new user - no id needed
        await createUser.mutateAsync(formData);
      }
      
      setIsDialogOpen(false);
      setEditingUser(null);
    } catch (error) {
      // Error is handled by mutation's onError
      console.error('Form submission error:', error);
    }
  };
  
  const handleDelete = (id: string) => {
    deleteUser.mutate(id);
  };

  const handleToggleStatus = (id: string) => {
    toggleStatus.mutate(id);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-7xl">
          <div className="mb-4">
            <Skeleton className="h-10 w-1/3 mb-4" />
            <Skeleton className="h-8 w-full mb-2" />
            <Skeleton className="h-8 w-full mb-2" />
            <Skeleton className="h-8 w-full mb-2" />
          </div>
          <div>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full mb-2" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const isSubmitting = createUser.isPending || updateUser.isPending;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-800 rounded">
            {error}
          </div>
        )}

        <UserFilters
          profiles={profiles || []}
          selectedProfile={selectedProfile}
          setSelectedProfile={setSelectedProfile}
          searchId={searchId}
          setSearchId={setSearchId}
          openCreateModal={openCreateDialog}
        />
        <UserTable
          users={filteredUsers}
          onEdit={openEditDialog}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
        />

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingUser ? "Edit User" : "Create New User"}
              </DialogTitle>
            </DialogHeader>
            <UserForm
              profiles={profiles  || []}
              initialData={editingUser}
              onSubmit={handleSubmit}
              isLoading={isSubmitting}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}