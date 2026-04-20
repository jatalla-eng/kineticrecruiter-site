import { getLegalPageWithHtml } from '@/lib/legal';
import { generatePageMetadata } from '@/lib/metadata';
import { notFound } from 'next/navigation';

export const metadata = generatePageMetadata({
  title: 'Privacy Policy',
  description: 'How KineticRecruiter collects, uses, and protects your personal information.',
  path: '/privacy',
});

// Revalidate on every request so admin edits appear immediately
export const dynamic = 'force-dynamic';

export default async function PrivacyPage() {
  const page = await getLegalPageWithHtml('privacy');
  if (!page) notFound();

  return (
    <main className="bg-white">
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 pb-6 border-b border-gray-100">
            <p className="text-sm font-medium text-kinetic-teal uppercase tracking-wider mb-2">
              Legal
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-kinetic-navy mb-3">
              {page.title}
            </h1>
            <p className="text-sm text-gray-500">
              Last updated: {new Date(page.updated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <article
            className="prose prose-lg max-w-none prose-headings:text-kinetic-navy prose-a:text-kinetic-teal prose-a:no-underline hover:prose-a:underline prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded"
            dangerouslySetInnerHTML={{ __html: page.html! }}
          />
        </div>
      </section>
    </main>
  );
}
