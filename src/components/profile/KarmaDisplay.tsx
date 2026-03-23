interface Props {
  score: number;
  label: string;
}

export function KarmaDisplay({ score, label }: Props) {
  const color = score >= 0 ? 'text-campus-success' : 'text-campus-danger';

  return (
    <div className="flex flex-col items-center">
      <div className={`text-5xl font-bold font-mono ${color}`}>
        {score > 0 ? `+${score}` : score}
      </div>
      <div className="text-campus-muted text-xs mt-1">{label}</div>
    </div>
  );
}
