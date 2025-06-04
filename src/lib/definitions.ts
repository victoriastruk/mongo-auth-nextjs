import { z } from 'zod'

export const SignupFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  phone: z.string().min(2).trim(),
  password: z.string().trim()
})

export type FormState =
  | {
      errors?: {
        username?: string[]
        phone?: string[]
        password?: string[]
      }
      error?: string
      message?: string
    }
  | undefined

export type SessionPayload = {
  userId: string
  username: string
  expiresAt: Date
}

export type State = {
  errors?: {
    username?: string[];
    phone?: string[];
  };
  message: string | null;
};

export type UserForm = {
  id: string;
  username: string;
  phone: string;
};