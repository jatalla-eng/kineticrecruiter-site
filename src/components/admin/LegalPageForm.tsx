'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';

interface LegalPageFormProps {
  slug: 'privacy' | 'terms';
}

export default function LegalPageForm({ slug }: LegalPageFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    updated: '',
    content: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const router = useRouter();

  const displayName = slug === 'privacy' ? 'Privacy Policy' : 'Terms of Service';
  const publicUrl = `/${slug}`;

  useEffect(() => {
    async function fetchPage() {
      try {
        const res = await fetch(`/api/admin/legal/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setFormData({
            title: data.title || displayName,
            updated: data.updated || new Date().toISOString().split('T')[0],
            content: data.rawContent || '',
          });
        } else if (res.status === 404) {
          setFormData({
            title: displayName,
            updated: new Date().toISOString().split('T')[0],
            content: '',
          });
        } else {
          setError('Failed to load page');
        }
      } catch {
        setError('Network error');
      } finally {
        setIsFetching(false);
      }
    }
    fetchPage();
  }, [slug, displayName]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSaveSuccess(false);

    try {
      const res = await fetch(`/api/admin/legal/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          updated: new Date().toISOString().split('T')[0],
        }),
      });

      if (res.ok) {
        setFormData(prev => ({ ...prev, updated: new Date().toISOString().split('T')[0] }));
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to save');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  if (isFetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Edit {displayName}</h1>
            <div className="flex items-center gap-3">
              <Link href={publicUrl} target="_blank" className="text-kinetic-teal hover:underline text-sm font-medium">
                View Page
              </Link>
              <Button variant="secondary" onClick={() => router.push('/admin')}>
                Back to Admin
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {saveSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              Saved successfully. Changes are live at {publicUrl}.
            </div>
          )}

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Page Title *
            </label>
            <input
              id="title"
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kinetic-teal focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content (Markdown) *
            </label>
            <textarea
              id="content"
              required
              rows={30}
              value={formData.content}
              onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kinetic-teal focus:border-transparent font-mono text-sm"
              placeholder={`# ${displayName}\n\nYour content here in Markdown...`}
            />
            <p className="mt-1 text-sm text-gray-500">
              Markdown supported: <code>**bold**</code>, <code>*italic*</code>, <code># Headings</code>, <code>[links](url)</code>, tables, lists, etc.
              The &quot;Last updated&quot; date is set automatically on save.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button type="button" variant="secondary" onClick={() => router.push('/admin')}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
