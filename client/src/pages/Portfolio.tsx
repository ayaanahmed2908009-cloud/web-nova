import Navigation from "@/components/Navigation";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
export default function ExamplesPage() {
  useSEO({
    title: "Our best examples | WebNova",
    description:
      "Explore examples of the websites we build with practical features and clear costs.",
    canonical: "https://webnovasolution.com/examples",
  });
  return (
    <>
      <Navigation />
      <main className="pt-24">
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}
