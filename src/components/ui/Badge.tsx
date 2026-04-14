interface BadgeProps {
  children: React.ReactNode;
  variant?: 'teal' | 'amber' | 'navy';
  className?: string;
}

const variantClasses: Record<NonNullable<BadgeProps['variant']>, string> = {
  teal: 'bg-kinetic-teal text-white',
  amber: 'bg-motion-amber text-white',
  navy: 'bg-kinetic-navy text-white',
};

export default function Badge({ children, variant = 'teal', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
