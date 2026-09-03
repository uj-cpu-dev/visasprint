const SCALE_MIN = 18000;
const SCALE_MAX = 45000;

function toPercent(value: number): number {
  const pct = ((value - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100;
  return Math.min(100, Math.max(0, pct));
}

function formatGbp(value: number): string {
  return `£${value.toLocaleString("en-GB")}`;
}

type Confidence = "confirmed" | "fuzzy";

type Props = {
  salary: number;
  goingRate: number;
  confidence?: Confidence;
};

export function SalaryThreshold({
  salary,
  goingRate,
  confidence = "confirmed",
}: Props) {
  const salaryPct = toPercent(salary);
  const ratePct = toPercent(goingRate);
  const clears = salary >= goingRate;

  const fillColour = !clears
    ? "bg-below"
    : confidence === "fuzzy"
      ? "bg-caution"
      : "bg-clear";

  const difference = Math.abs(salary - goingRate);
  const label = `${formatGbp(salary)} per year, ${formatGbp(difference)} ${
    clears ? "above" : "below"
  } the ${formatGbp(goingRate)} going rate for this role`;

  return (
    <div className="relative h-11" role="img" aria-label={label}>
      <div className="absolute top-2 left-0 right-0 h-[3px] rounded-sm bg-track" />
      <div
        className={`absolute top-2 left-0 h-[3px] rounded-sm ${fillColour}`}
        style={{ width: `${salaryPct}%` }}
      />
      <div
        className="absolute top-0.5 h-4 w-px bg-ink"
        style={{ left: `${ratePct}%` }}
      />
      <div
        className="absolute top-5 -translate-x-1/2 whitespace-nowrap text-[11px] text-ink-muted"
        style={{ left: `${ratePct}%` }}
      >
        {formatGbp(goingRate)}
      </div>
    </div>
  );
}