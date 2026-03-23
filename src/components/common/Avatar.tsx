const COLORS = [
  'bg-campus-primary',
  'bg-campus-secondary',
  'bg-campus-success',
  'bg-campus-warning',
  'bg-pink-500',
  'bg-cyan-500',
];

interface Props {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-16 h-16 text-xl',
};

export function Avatar({ name, size = 'md' }: Props) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const colorIndex = name.length % COLORS.length;

  return (
    <div
      className={`${sizeClasses[size]} ${COLORS[colorIndex]} rounded-full flex items-center justify-center text-white font-bold shrink-0`}
    >
      {initials}
    </div>
  );
}
