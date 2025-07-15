'use server'

import { z } from 'zod'
import {
  createSession,
  createUser,
  deleteSession,
  verifyPassword,
} from '@/lib/auth'
import { getUserByEmail } from '@/lib/dal'
import { mockDelay } from '@/lib/utils'
import { redirect } from 'next/navigation'

// Define Zod schema for signin validation
const SignInSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
})

// Define Zod schema for signup validation
const SignUpSchema = z
  .object({
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type SignInData = z.infer<typeof SignInSchema>
export type SignUpData = z.infer<typeof SignUpSchema>

export type ActionResponse = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
  error?: string
}

export const signin = async (formData: FormData): Promise<ActionResponse> => {
  await mockDelay(700)

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  };

  try {
    const validationResult = SignInSchema.safeParse(data);

    if (!validationResult.success) {
      return {
        success: false,
        message: 'not valid',
        errors: validationResult.error.flatten().fieldErrors
      }
    }

    const user = await getUserByEmail(data.email);

    if (!user) {
      return {
        success: false,
        message: '',
        errors: {
          email: ['email or password not valid']
        }
      }
    }

    const isPasswordValid = await verifyPassword(data.password, user.password);

    if (!isPasswordValid) {
      return {
        success: false,
        message: '',
        errors: {
          email: ['invalid email or password']
        }
      }
    }

    await createSession(user.id)

    return {
      success: true,
      message: 'succesfully sign in'
    }

  } catch (err) {
    console.error(err);

    return {
      success: false,
      message: 'somethong went wrong',
      error: 'somethong went wrong'
    }
  }
}

export const signup = async (formData: FormData): Promise<ActionResponse> => {
  await mockDelay(700)

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string
  };

  try {
    const validationResult = SignUpSchema.safeParse(data);

    if (!validationResult.success) {
      return {
        success: false,
        message: 'not valid',
        errors: validationResult.error.flatten().fieldErrors
      }
    }

    const existingUser = await getUserByEmail(data.email);
    if (existingUser) {
      return {
        success: false,
        message: '',
        errors: {
          email: ['User with this email already exists'],
        },
      }
    }

    const user = await createUser(data.email, data.password);
    if (!user) {
      return {
        success: false,
        message: 'Failed to create user',
        error: 'Failed to create user',
      }
    }

    await createSession(user.id)

    return {
      success: true,
      message: 'user successfully created'
    }

  } catch (error) {
    console.error('Sign up error:', error)
    return {
      success: false,
      message: 'something went wrong',
      error: 'something went wrong',
    }
  }
};

export async function signOut() {
  try {
    await mockDelay(700)
    await deleteSession()
  } catch (error) {
    console.log('sign out error', error)
    throw new Error('failed to sign out')
  } finally {
    redirect('/signin')
  }
}
