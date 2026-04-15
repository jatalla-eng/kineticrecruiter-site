import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const { name, email, company, jobTitle, industry, seniority, source } = body;

  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
  }

  const leadData = {
    name,
    email,
    company: company || 'Not provided',
    jobTitle: jobTitle || '',
    industry: industry || '',
    seniority: seniority || '',
    source: source || 'website',
    timestamp: new Date().toISOString(),
  };

  // Try Brevo transactional email if API key is configured
  if (process.env.BREVO_API_KEY) {
    try {
      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'api-key': process.env.BREVO_API_KEY,
        },
        body: JSON.stringify({
          sender: { name: 'KineticRecruiter', email: 'noreply@kineticrecruiter.com' },
          to: [{ email: 'contactus@kineticrecruiter.com', name: 'KineticRecruiter Sales' }],
          subject: `New Lead: ${name} from ${company || 'Unknown'} (${source})`,
          htmlContent: `
            <h2>New Lead from ${source === 'jd-generator' ? 'JD Generator' : 'Website'}</h2>
            <table style="border-collapse:collapse;width:100%;max-width:500px;">
              <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${name}</td></tr>
              <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Company</td><td style="padding:8px;border-bottom:1px solid #eee;">${company || 'Not provided'}</td></tr>
              ${jobTitle ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Generated JD For</td><td style="padding:8px;border-bottom:1px solid #eee;">${seniority} ${jobTitle} (${industry})</td></tr>` : ''}
              <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Source</td><td style="padding:8px;border-bottom:1px solid #eee;">${source}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;">Timestamp</td><td style="padding:8px;">${leadData.timestamp}</td></tr>
            </table>
          `,
        }),
      });
    } catch (err) {
      console.error('Brevo email failed:', err);
      // Don't fail the request — lead capture is best-effort
    }
  } else {
    // No email service configured — log to console (visible in Cloud Run logs)
    console.log('LEAD_CAPTURE:', JSON.stringify(leadData));
  }

  return NextResponse.json({ ok: true });
}
