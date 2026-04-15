import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(request: NextRequest) {
  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { jobTitle, industry, seniority, responsibilities, requirements } = body;

  if (!jobTitle?.trim() || !industry?.trim() || !seniority?.trim() || !responsibilities?.trim()) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: 'API not configured' }, { status: 500 });
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
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });
    const text = response.text;

    if (!text) {
      return NextResponse.json({ error: 'No content generated.' }, { status: 500 });
    }

    return NextResponse.json({ jd: text });
  } catch (err) {
    console.error('Gemini error:', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Failed to generate job description. Please try again.' }, { status: 500 });
  }
}
