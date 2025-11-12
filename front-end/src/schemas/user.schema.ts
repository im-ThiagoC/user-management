// schemas/user.schema.ts
import { z } from 'zod';

export const UserFormSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'First name can only contain letters'),
  
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Last name can only contain letters'),
  
  email: z
    .string()
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),
  
  profileId: z
    .string()
    .min(1, 'Please select a profile'),
  
  isActive: z
    .boolean()
});

export type UserFormValues = z.infer<typeof UserFormSchema>;

export const createUserSchema = UserFormSchema;
export const updateUserSchema = UserFormSchema.partial().required({
  email: true,
  profileId: true,
});