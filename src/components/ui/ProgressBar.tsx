interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  colorClass?: string;
  height?: string;
}

export function ProgressBar({
  value,
  max,
  label,
  colorClass = 'from-violet to-cyan',
  height = 'h-2',
}: ProgressBarProps) {
  const percentage = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm text-navy-300">{label}</span>
          <span className="text-sm font-medium text-navy-100">{value}/{max}</span>
        </div>
      )}
      <div className={`w-full ${height} bg-navy-800 rounded-full overflow-hidden`}>
        <div
          className={`h-full bg-gradient-to-r ${colorClass} rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
