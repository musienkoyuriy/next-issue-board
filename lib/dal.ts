import { unstable_cacheTag as cacheTag } from 'next/cache'
import { db } from '@/db'
import { getSession } from './auth'
import { eq } from 'drizzle-orm'
import { issues, users } from '@/db/schema'
import { mockDelay } from './utils'

export const getIssue = async (id: number) => {
  'use cache';

  await mockDelay(700);

  try {
    const result = await db.query.issues.findFirst({
      where: eq(issues.id, id),
      with: {
        user: true
      }
    });

    return result;
  } catch (error) {
    console.log('error getting issue', error)
    throw new Error('error getting issue')
  }
};

export const getIssues = async () => {
  'use cache';
  cacheTag('issues');

  try {
    const result = await db.query.issues.findMany({
      with: {
        user: true
      },
      orderBy: (issues, { desc }) => [desc(issues.createdAt)],
    });

    return result;
  } catch (error) {
    console.log('error getting issues', error)
    throw new Error('error getting issues')
  }
};

// Cached function to get user by ID
const getCachedUserById = async (userId: string) => {
  'use cache';

  try {
    const res = await db
      .select()
      .from(users)
      .where(eq(users.id, userId));

    return res[0] || null
  }
  catch (err) {
    console.log('error getting user from db', err)
    return null;
  }
}

// Non-cached function that handles session and calls cached user lookup
export const getCurrentUser = async () => {
  const session = await getSession()
  if (!session) return null;

  return getCachedUserById(session.userId);
}

export const getUserByEmail = async (email: string) => {
  'use cache';

  try {
    const result = await db.query.users.findFirst({
      where: eq(users.email, email)
    })

    console.log('result form db', result)

    return result || null
  } catch (error) {
    console.log('error getting by email', error)
    return null;
  }
};
