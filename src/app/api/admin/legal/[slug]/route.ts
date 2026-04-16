import { NextRequest, NextResponse } from 'next/server';
import { getLegalPage, saveLegalPage, LegalSlug } from '@/lib/legal';
import { isAuthenticated } from '@/lib/auth';

const VALID_SLUGS: LegalSlug[] = ['privacy', 'terms'];

function isValidSlug(slug: string): slug is LegalSlug {
  return VALID_SLUGS.includes(slug as LegalSlug);
}

async function requireAuth() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }
  return null;
}

type Params = Promise<{ slug: string }>;

export async function GET(_req: NextRequest, { params }: { params: Params }) {
  const auth = await requireAuth();
  if (auth) return auth;

  const { slug } = await params;
  if (!isValidSlug(slug)) {
    return NextResponse.json({ error: 'Invalid page' }, { status: 400 });
  }

  const page = getLegalPage(slug);
  if (!page) {
    return NextResponse.json({ error: 'Page not found' }, { status: 404 });
  }

  return NextResponse.json(page);
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  const auth = await requireAuth();
  if (auth) return auth;

  const { slug } = await params;
  if (!isValidSlug(slug)) {
    return NextResponse.json({ error: 'Invalid page' }, { status: 400 });
  }

  let body: { title: string; updated: string; content: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!body.title?.trim() || !body.content?.trim()) {
    return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
  }

  saveLegalPage(slug, {
    title: body.title,
    updated: body.updated || new Date().toISOString().split('T')[0],
    content: body.content,
  });

  return NextResponse.json({ ok: true });
}
