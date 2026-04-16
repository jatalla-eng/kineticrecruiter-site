import LegalPageForm from '@/components/admin/LegalPageForm';
import { notFound } from 'next/navigation';

const VALID_SLUGS = ['privacy', 'terms'] as const;
type ValidSlug = typeof VALID_SLUGS[number];

type Props = { params: Promise<{ slug: string }> };

export default async function EditLegalPage({ params }: Props) {
  const { slug } = await params;
  if (!VALID_SLUGS.includes(slug as ValidSlug)) {
    notFound();
  }

  return <LegalPageForm slug={slug as ValidSlug} />;
}
