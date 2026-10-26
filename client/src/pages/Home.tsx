import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
export default function Home() {
  useSEO({
    title: "WebNova | Websites at cost. Local impact.",
    description:
      "At-cost full-stack websites for Saudi small businesses and nonprofits. 10 entities supported and $6,000 in sales generated through their websites.",
    canonical: "https://webnovasolution.com/",
  });
  return (
    <div className="bg-[#f5f4ee] text-stone-900">
      <Navigation />
      <main>
        <section className="max-w-7xl mx-auto px-6 pt-40 pb-20 md:pt-48 md:pb-28 grid lg:grid-cols-[1.3fr_1fr] gap-12 items-center">
          <div>
            <p className="uppercase tracking-widest text-sm font-semibold text-emerald-800 mb-6">
              Saudi roots. Community purpose.
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]">
              Good work deserves
              <br />
              <span className="text-emerald-800">to be seen.</span>
            </h1>
            <p className="text-xl text-stone-600 mt-8 max-w-xl leading-relaxed">
              We help small businesses and nonprofits in Saudi Arabia reach more
              people with full-stack websites at minimum cost.
            </p>
            <p className="text-lg font-medium mt-5">
              You pay the cost of the website. Nothing more.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/project-form"
                className="bg-emerald-900 text-white rounded-full px-7 py-4 font-semibold"
              >
                Build your website →
              </Link>
              <Link
                href="/examples"
                className="border border-stone-400 rounded-full px-7 py-4 font-semibold"
              >
                See our examples
              </Link>
            </div>
          </div>
          <div className="relative rounded-3xl bg-emerald-900 p-7 sm:p-10">
            <p className="text-emerald-100 text-sm mb-5">
              A stronger presence. More opportunity.
            </p>
            <img
              src="/rsoom-screenshot.png"
              alt="RSOOM business website"
              className="rounded-xl w-full aspect-[4/3] object-contain object-top shadow-xl"
            />
            <p className="text-white mt-6 text-xl">
              Built for real people.
              <br />
              Made to open doors.
            </p>
          </div>
        </section>
        <section aria-label="Our impact" className="border-y border-stone-300">
          <div className="max-w-7xl mx-auto px-6 py-12 grid sm:grid-cols-3 gap-8">
            {[
              ["10", "businesses and nonprofits supported"],
              ["$6,000", "in sales generated for them through their websites"],
              ["At cost", "no added profit margin on your website"],
            ].map(([value, label]) => (
              <div key={value}>
                <p className="text-4xl md:text-5xl font-semibold text-emerald-900">
                  {value}
                </p>
                <p className="text-stone-600 mt-3 max-w-xs">{label}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="max-w-7xl mx-auto px-6 py-24">
          <p className="uppercase tracking-widest text-emerald-800 text-sm mb-5">
            Why we exist
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold max-w-3xl tracking-tight">
            A limited budget shouldn’t mean limited visibility.
          </h2>
          <div className="grid md:grid-cols-3 gap-10 mt-12">
            {[
              [
                "Be discovered",
                "Give customers and supporters a clear place to learn who you are, what you offer, and how to reach you.",
              ],
              [
                "Do more online",
                "From storefronts to forms and useful dashboards, we build the features your organization actually needs.",
              ],
              [
                "Keep costs clear",
                "We explain the real costs up front and build around your priorities. You cover the website’s cost, with nothing added on top.",
              ],
            ].map(([title, body], i) => (
              <div key={title}>
                <p className="text-emerald-800 mb-5">0{i + 1}</p>
                <h3 className="text-2xl font-semibold mb-4">{title}</h3>
                <p className="text-stone-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>
        <Portfolio />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
