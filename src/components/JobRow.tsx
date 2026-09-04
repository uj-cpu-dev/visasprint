import { SalaryThreshold } from "./SalaryThreshold";

export type Job = {
  id: string;
  title: string;
  employer: string;
  socCode: string;
  salary: number;
  goingRate: number;
  confidence?: "confirmed" | "fuzzy";
};

export function JobRow({ job, index }: { job: Job; index: number }) {
  return (
    <article className="border-t border-rule py-5">
      <div className="flex items-baseline justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-[15px] font-medium">{job.title}</h2>
          <p className="mt-0.5 text-xs text-ink-muted">
            {job.employer} · SOC {job.socCode}
          </p>
        </div>
        <p className="shrink-0 font-serif text-[22px] tabular-nums">
          £{job.salary.toLocaleString("en-GB")}
        </p>
      </div>

      <div className="mt-3">
        <SalaryThreshold
          salary={job.salary}
          goingRate={job.goingRate}
          confidence={job.confidence}
          index={index}
        />
      </div>
    </article>
  );
}