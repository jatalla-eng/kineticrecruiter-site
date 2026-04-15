import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const INDUSTRY_CONTEXT: Record<string, string> = {
  Technology: `Include: tech stack (languages, frameworks, cloud platforms), remote/hybrid policy, development methodology (Agile/Scrum), CI/CD practices, equity/stock if relevant, visa sponsorship status. Mention tools and technologies candidates will work with.`,
  Finance: `Include: regulatory knowledge required (AFSL, APRA, ASIC for AU; FCA for UK; SEC for US), relevant certifications (CPA, CFA, CA, AML/CTF), compliance and risk framework familiarity, security clearance if needed.`,
  Healthcare: `Include: mandatory certifications (AHPRA registration for AU, relevant clinical certs), compliance frameworks (Privacy Act AU, HIPAA US), shift patterns and on-call requirements, physical demands, Working With Children Check or vulnerable populations checks where relevant.`,
  Retail: `Include: rostering patterns (weekends, public holidays, peak seasons), any required certifications (RSA/RCG), physical requirements (standing, lifting), staff discounts and specific perks, store location details.`,
  Education: `Include: teaching registration/accreditation requirements (VIT, NESA for AU), Working With Children Check, curriculum frameworks, term dates and holiday structure, professional development support and CPD.`,
  Manufacturing: `Include: shift patterns (rotating, fixed, 24/7), machinery licences (forklift etc.), quality frameworks (ISO, Lean, Six Sigma), safety record and PPE requirements, physical demands.`,
  Media: `Include: portfolio/showreel expectations, tools and platforms used, content volume and deadlines, creative freedom vs brand guidelines balance, remote/hybrid flexibility for creative roles.`,
  'Professional Services': `Include: practising certificates and professional memberships, client-facing vs internal ratio, billable hours expectations if applicable, professional development and CPD support, partnership/progression pathway.`,
  Construction: `Include: required licences and tickets (White Card for AU, CSCS for UK), physical requirements (explicit and specific), site locations and FIFO/DIDO arrangements, safety certifications and PPE, union/EBA coverage if relevant.`,
  Hospitality: `Include: rostering patterns (weekends, evenings, public holidays), RSA certification if applicable, physical requirements, tip/service charge structure, staff meals and perks.`,
  Government: `Include: security clearance level required, citizenship/residency requirements, relevant legislation familiarity, public sector award/classification level, merit-based selection criteria format if needed.`,
  'Mining & Resources': `Include: FIFO/DIDO roster patterns, site locations, mandatory safety tickets and medicals, physical fitness requirements, camp/accommodation details, emergency response training.`,
  Other: `Adapt to the specific industry context provided. Include any certifications, compliance requirements, or working arrangements typical for this sector.`,
};

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

  const industryGuide = INDUSTRY_CONTEXT[industry] || INDUSTRY_CONTEXT['Other'];

  const prompt = `You are a senior recruitment copywriter with 15+ years of experience writing job descriptions that attract top talent. You specialise in the ${industry} sector.

TASK: Write a professional, compelling job description optimised for LinkedIn, SEEK, and Indeed.

ROLE DETAILS:
- Position: ${jobTitle}
- Industry: ${industry}
- Seniority: ${seniority}
- Key Responsibilities (from the hiring manager):
${responsibilities}
${requirements ? `- Requirements specified by hiring manager:\n${requirements}` : ''}

INDUSTRY-SPECIFIC GUIDANCE:
${industryGuide}

STRUCTURE (use these exact headings with ##):

## About the Role
2-3 sentences. Why this role exists, what team they join, what impact they will have. Write to the candidate using "you" — never "the successful candidate". Be specific about outcomes, not generic.

## Key Responsibilities
5-7 bullet points maximum. Start each with a strong action verb. Focus on OUTCOMES not tasks. Example: "Lead the migration to a microservices architecture, reducing deployment time by 50%" not "Manage technical projects".

## What You'll Need (Must-Have)
Only genuine dealbreakers — 5 items maximum. Include years of experience as ranges (e.g., "3-5 years"). Only include degree requirements if genuinely essential for the role. Include legally required certifications for this industry/role.

## Nice to Have
3-4 items clearly separated from requirements. These should encourage candidates who don't tick every box to still apply.

## What We Offer
5-6 specific, tangible benefits. Be concrete: "$5K annual L&D budget" not "competitive benefits". Include work arrangement (remote/hybrid/on-site), leave, development, culture specifics.

## How to Apply
One sentence with clear next step.

WRITING RULES:
- Tone: Professional but warm. Confident, not corporate-stiff.
- Always use "you/your" — never "the candidate" or "he/she"
- Use gender-neutral language throughout. No "rockstar", "ninja", "guru", "aggressive", "dominant"
- Prefer collaborative words: "collaborate", "develop", "lead", "create", "support", "analyse"
- No internal jargon, acronyms without explanation, or team codes
- Keep to 400-600 words total (the optimal range for application rates)
- Short paragraphs, scannable bullet points
- Australian English spelling (organisation, analyse, colour, favour)
- Do NOT include a salary range (the employer will add this)
- Do NOT include a company name (this is a template for the recruiter to customise)
- End responsibilities and requirements bullets WITHOUT full stops (cleaner formatting)`;

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
