interface BadgeProps {
  children: React.ReactNode;
  variant?: 'violet' | 'cyan' | 'success' | 'warning' | 'error' | 'neutral';
}

const variants: Record<string, string> = {
  violet: 'bg-violet/15 text-violet-light border-violet/30',
  cyan: 'bg-cyan/15 text-cyan-light border-cyan/30',
  success: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  warning: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  error: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  neutral: 'bg-navy-700/50 text-navy-200 border-navy-600',
};

export function Badge({ children, variant = 'neutral' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
