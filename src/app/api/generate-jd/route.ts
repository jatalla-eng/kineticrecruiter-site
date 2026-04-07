import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const {
    name,
    company,
    email,
    phone,
    jobTitle,
    industry,
    seniority,
    responsibilities,
    requirements,
  } = body as Record<string, string>;

  // Validate all required fields are present and non-empty
  const requiredFields = {
    name,
    company,
    email,
    phone,
    jobTitle,
    industry,
    seniority,
    responsibilities,
    requirements,
  };
  for (const [, value] of Object.entries(requiredFields)) {
    if (!value || value.trim() === '') {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
  }

  // Validate API key exists server-side — never expose to client
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  const prompt = `You are an expert recruiter writing professional job descriptions for a modern ATS platform.

Write a compelling, professional job description for:
Position: ${jobTitle}
Industry: ${industry}
Seniority Level: ${seniority}

Key Responsibilities:
${responsibilities}

Required Qualifications:
${requirements}

Format the output with these sections:
## Role Overview
## Key Responsibilities
## Required Qualifications
## Nice to Have
## What We Offer

Keep it concise, engaging, and suitable for posting on LinkedIn and Seek.`;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return NextResponse.json({ jd: text });
  } catch {
    // Do NOT log or expose the API key in any error response
    return NextResponse.json({ error: 'Failed to generate job description. Please try again.' }, { status: 500 });
  }
}
