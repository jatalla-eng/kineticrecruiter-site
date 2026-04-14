import Image from 'next/image';
import { Check } from 'lucide-react';

interface FeatureSectionProps {
  headline: string;
  body: string;
  bullets?: string[];
  imageSrc?: string;
  imageAlt?: string;
  reverse?: boolean;
  imageWidth?: number;
  imageHeight?: number;
}

export default function FeatureSection({
  headline,
  body,
  bullets,
  imageSrc,
  imageAlt = '',
  reverse = false,
  imageWidth = 600,
  imageHeight = 450,
}: FeatureSectionProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text side */}
          <div className={reverse ? 'lg:order-2' : ''}>
            <h3 className="text-2xl md:text-3xl font-bold text-kinetic-navy mb-6">{headline}</h3>
            {body.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-600 text-lg leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
            {bullets && bullets.length > 0 && (
              <ul className="mt-4 space-y-3">
                {bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-kinetic-teal flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Image side */}
          <div className={reverse ? 'lg:order-1' : ''}>
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={imageWidth}
                height={imageHeight}
                className="rounded-xl shadow-md w-full h-auto"
              />
            ) : (
              <div className="rounded-xl shadow-md bg-gray-100 w-full aspect-[4/3]" aria-hidden="true" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
