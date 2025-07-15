import { unstable_cacheTag as cacheTag } from 'next/cache'
import { db } from '@/db'
import { getSession } from './auth'
import { eq } from 'drizzle-orm'
import { cache } from 'react'
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

export const getCurrentUser = cache(async () => {
  const session = await getSession()
  if (!session) return null;

  try {
    const res = await db
      .select()
      .from(users)
      .where(eq(users.id, session.userId));

    return res[0] || null
  }
  catch (err) {
    console.log('error getting user from db', err)
    return null;
  }
});

export const getUserByEmail = cache(async (email: string) => {
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
});
