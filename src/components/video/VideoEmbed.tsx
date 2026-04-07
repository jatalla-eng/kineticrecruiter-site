import { Play } from 'lucide-react';

interface VideoEmbedProps {
  videoUrl?: string;
  thumbnailSrc?: string;
  title?: string;
}

export default function VideoEmbed({ videoUrl, title = 'Product Video' }: VideoEmbedProps) {
  if (videoUrl) {
    return (
      <div className="w-full">
        <iframe
          src={videoUrl}
          title={title}
          allowFullScreen
          className="w-full aspect-video rounded-xl border-0"
        />
      </div>
    );
  }

  // Placeholder state
  return (
    <div className="w-full aspect-video rounded-xl bg-gradient-to-br from-[#0d8488] to-[#0a6b6e] flex flex-col items-center justify-center">
      <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-4">
        <Play className="w-10 h-10 text-white ml-1" aria-hidden="true" />
      </div>
      <p className="text-white font-medium text-lg">Product Tour — Coming Soon</p>
    </div>
  );
}
