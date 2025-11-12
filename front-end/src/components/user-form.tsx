"use client";

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Types & Schema
import { User, Profile, UserFormData } from '@/types';
import { UserFormSchema } from '@/schemas/user.schema';

// UI Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import z from 'zod';

interface UserFormProps {
  profiles: Profile[];
  initialData: User | null;
  onSubmit: (data: UserFormData) => void;
  isLoading: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({
  profiles,
  initialData,
  onSubmit,
  isLoading,
}) => {
  const isEditing = !!initialData;

  // React Hook Form com Zod resolver
  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      profileId: profiles[0]?.id || '',
      isActive: true,
    },
  });

  // Reset form quando initialData mudar
  useEffect(() => {
    if (initialData) {
      form.reset({
        firstName: initialData.firstName,
        lastName: initialData.lastName,
        email: initialData.email,
        profileId: initialData.profileId,
        isActive: initialData.isActive,
      });
    } else {
      form.reset({
        firstName: '',
        lastName: '',
        email: '',
        profileId: profiles[0]?.id || '',
        isActive: true,
      });
    }
  }, [initialData, profiles, form]);

  const handleSubmit = (data: z.infer<typeof UserFormSchema>) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {/* First Name */}
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name *</FormLabel>
              <FormControl>
                <Input
                  placeholder="John"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Last Name */}
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Doe"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="john.doe@example.com"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Profile */}
        <FormField
          control={form.control}
          name="profileId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile *</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a profile" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {profiles && profiles.map((profile) => (
                    <SelectItem key={profile.id} value={profile.id}>
                      {profile.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Active Status */}
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Active User</FormLabel>
              </div>
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="submit"
            disabled={isLoading || !form.formState.isDirty}
          >
            {isLoading
              ? 'Saving...'
              : isEditing
              ? 'Update User'
              : 'Create User'}
          </Button>
        </div>
      </form>
    </Form>
  );
};