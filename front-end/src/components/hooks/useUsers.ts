// hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '@/services/api.service';
import { User, Profile, CreateUserData, ApiResponse, UpdateUserData, UserFormData } from '@/types';

// Query Keys
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (profileId?: string) => [...userKeys.lists(), { profileId }] as const,
};

export const profileKeys = {
  all: ['profiles'] as const,
  lists: () => [...profileKeys.all, 'list'] as const,
};

// Queries
export const useUsers = (profileId?: string) => {
  return useQuery<User[]>({
    queryKey: userKeys.list(profileId),
    queryFn: async () => {
      const response: ApiResponse<User[]> = await api.users.getAll(profileId);
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useProfiles = () => {
  return useQuery<Profile[]>({
    queryKey: profileKeys.lists(),
    queryFn: async () => {
      const response: ApiResponse<Profile[]> = await api.profiles.getAll();
      return response.data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutos (profiles mudam menos)
  });
};

// Mutations
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, CreateUserData>({
    mutationFn: async (data: CreateUserData) => {
      const response: ApiResponse<User> = await api.users.create(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      toast.success('User created successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create user');
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, { id: string; data: UserFormData }>({
    mutationFn: async ({ id, data }: { id: string; data: UserFormData }) => {
      const response: ApiResponse<User> = await api.users.update(id, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      toast.success('User updated successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update user');
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      const response: ApiResponse<void> = await api.users.delete(id);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      toast.success('User deleted successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete user');
    },
  });
};

export const useToggleUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, string>({
    mutationFn: async (id: string) => {
      const response: ApiResponse<User> = await api.users.toggleStatus(id);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      toast.success('User status updated!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to toggle user status');
    },
  });
};