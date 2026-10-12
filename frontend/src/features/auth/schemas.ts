import { z } from 'zod';

export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, 'Username is required'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, 'Username must be at least 3 characters'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
