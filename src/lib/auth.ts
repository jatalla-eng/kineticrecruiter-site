import bcrypt from 'bcryptjs';
import { getIronSession } from 'iron-session';
import { SessionData, defaultSession, sessionOptions } from './session';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function getSession() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
}

export async function login(username: string, password: string) {
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'password';

  if (username === adminUsername && password === adminPassword) {
    const session = await getSession();
    session.userId = '1';
    session.username = username;
    session.isLoggedIn = true;
    await session.save();
    return { success: true };
  }

  return { success: false, error: 'Invalid credentials' };
}

export async function logout() {
  const session = await getSession();
  session.destroy();
}

export async function isAuthenticated() {
  const session = await getSession();
  return session.isLoggedIn;
}