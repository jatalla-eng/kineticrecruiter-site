interface BadgeProps {
  children: React.ReactNode;
  variant?: 'teal' | 'amber' | 'navy';
  className?: string;
}

const variantClasses: Record<NonNullable<BadgeProps['variant']>, string> = {
  teal: 'bg-[#0d8488] text-white',
  amber: 'bg-[#E8A838] text-white',
  navy: 'bg-[#1a2332] text-white',
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
