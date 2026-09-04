import { JobRow, type Job } from "@/components/JobRow";

const JOBS: Job[] = [
  {
    id: "1",
    title: "Registered nurse, band 5",
    employer: "Leeds Teaching Hospitals NHS Trust",
    socCode: "2231",
    salary: 31049,
    goingRate: 29970,
  },
  {
    id: "2",
    title: "Diagnostic radiographer, band 6",
    employer: "Spire Healthcare",
    socCode: "2217",
    salary: 39205,
    goingRate: 32000,
    confidence: "fuzzy",
  },
  {
    id: "3",
    title: "Healthcare assistant",
    employer: "Priory Group",
    socCode: "6131",
    salary: 24169,
    goingRate: 25000,
  },
  {
    id: "4",
    title: "Occupational therapist, band 6",
    employer: "Manchester University NHS Foundation Trust",
    socCode: "2222",
    salary: 37338,
    goingRate: 32000,
  },
];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl px-8 py-16">
      <h1 className="font-serif text-2xl">VisaSprint</h1>
      <p className="mt-1 text-xs text-ink-muted">
        Rules current to 1 September 2026
      </p>

      <div className="mt-10">
      {JOBS.map((job, i) => (
          <JobRow key={job.id} job={job} index={i} />
      ))}
      </div>
    </main>
  );
}