import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Pricing from "@/components/Pricing";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
export default function About() {
  useSEO({
    title: "Our purpose | WebNova",
    description:
      "Helping Saudi small businesses and nonprofits gain visibility through full-stack websites at minimum cost.",
  });
  return (
    <>
      <Navigation />
      <main className="bg-[#f5f4ee] pt-40">
        <section className="max-w-5xl mx-auto px-6 pb-24">
          <p className="text-emerald-800 uppercase tracking-widest mb-5">
            Our purpose
          </p>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-10">
            Local organizations.
            <br />
            More possibilities.
          </h1>
          <div className="space-y-6 text-xl text-stone-600 max-w-3xl">
            <p>
              Small businesses and nonprofits in Saudi Arabia do meaningful
              work, but too often lack the online exposure to reach the people
              who need them.
            </p>
            <p>
              WebNova exists to help close that gap. We build full-stack
              websites at minimum cost, giving organizations a practical way to
              share their work, connect with their communities, and sell online.
            </p>
            <p>
              We have built websites for 10 entities, helping generate $6,000 in
              sales for them through their websites.
            </p>
            <p>
              Our approach is simple: understand what matters, build what is
              useful, and charge the cost of the website—nothing more.
            </p>
          </div>
          <Link
            href="/examples"
            className="inline-block mt-10 text-emerald-900 font-semibold underline underline-offset-4"
          >
            Here are our best examples →
          </Link>
        </section>
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
