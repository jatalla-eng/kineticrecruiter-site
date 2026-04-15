import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: NextRequest) {
  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { jobTitle, industry, seniority, responsibilities, requirements } = body;

  if (!jobTitle?.trim() || !industry?.trim() || !seniority?.trim() || !responsibilities?.trim()) {
    return NextResponse.json({ error: 'Missing required fields: jobTitle, industry, seniority, responsibilities' }, { status: 400 });
  }

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

${requirements ? `Required Qualifications:\n${requirements}` : ''}

Format the output with these sections:
## Role Overview
## Key Responsibilities
## Required Qualifications
## Nice to Have
## What We Offer

Keep it concise, engaging, and suitable for posting on LinkedIn and Seek.`;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return NextResponse.json({ jd: text });
  } catch (err) {
    console.error('Gemini API error:', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Failed to generate job description. Please try again.' }, { status: 500 });
  }
}
