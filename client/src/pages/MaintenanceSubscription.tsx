import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Pricing from "@/components/Pricing";
export default function MaintenanceSubscription() {
  return (
    <>
      <Navigation />
      <main className="pt-40 bg-[#f5f4ee]">
        <section className="max-w-5xl mx-auto px-6 pb-24">
          <p className="text-emerald-800 uppercase tracking-widest mb-5">
            After launch
          </p>
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-8">
            Keep your website useful.
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl">
            Your organization changes, and your website should keep up. We can
            discuss updates, fixes, and ongoing support based on what you
            actually need.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              [
                "Stay up to date",
                "Keep your content, opening hours, services, and contact details current.",
              ],
              [
                "Keep things working",
                "Plan for software updates, backups, and issues that arise after launch.",
              ],
              [
                "Know the costs",
                "We explain any recurring hosting or service costs and agree on the scope of support in advance. You cover the cost, with no added profit margin.",
              ],
            ].map(([title, description]) => (
              <div key={title}>
                <h2 className="text-2xl font-semibold mb-4">{title}</h2>
                <p className="text-stone-600">{description}</p>
              </div>
            ))}
          </div>
        </section>
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
