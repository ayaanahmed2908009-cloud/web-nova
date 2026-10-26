import { Link } from "wouter";
export default function Pricing() {
  return (
    <section id="pricing" className="bg-emerald-950 text-white px-6 py-24">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <p className="uppercase tracking-widest text-emerald-200 text-sm mb-5">
            Our at-cost promise
          </p>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight">
            The cost of your website.
            <br />
            Nothing more.
          </h2>
        </div>
        <div className="space-y-6 text-lg text-emerald-50">
          <p>
            Small budgets should never keep good work out of sight. We build
            full-stack websites for small businesses and nonprofits in Saudi
            Arabia at minimum cost.
          </p>
          <p>
            You pay only what it costs to build and run your website. No added
            profit margin. No agency markup.
          </p>
          <p>
            We explain the costs before work begins, including any hosting,
            domain, and third-party services your website needs. Recurring costs
            are made clear, too.
          </p>
          <Link
            href="/project-form"
            className="inline-block rounded-full bg-lime-200 text-emerald-950 px-7 py-4 font-semibold"
          >
            Tell us what you need →
          </Link>
        </div>
      </div>
    </section>
  );
}
