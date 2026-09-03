import { SalaryThreshold } from "@/components/SalaryThreshold";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col justify-center px-16 py-32">
      <div className="max-w-2xl">
        <p className="text-sm text-ink-muted">
          Leeds Teaching Hospitals NHS Trust · SOC 2231
        </p>
        <p className="mt-1 text-base font-medium">Registered nurse, band 5</p>
        <p className="mt-6 font-serif text-5xl font-light tabular-nums">
          £31,049
        </p>
        <div className="mt-4 w-96">
           <SalaryThreshold salary={31049} goingRate={29970} confidence="fuzzy" />
         </div>
        <p className="mt-4 text-sm text-ink-muted">
          Going rate for this occupation code: £29,970
        </p>
      </div>
    </main>
  );
}