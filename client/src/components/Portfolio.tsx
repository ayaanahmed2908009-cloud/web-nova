const examples = [
  {
    name: "RSOOM",
    image: "/rsoom-screenshot.png",
    category: "Small business",
    description:
      "A website that introduces the business and makes its services easier to discover.",
  },
  {
    name: "Simple Physics Online Classes",
    image: "/simplephysics-tutor.png",
    category: "Education",
    description:
      "A clear online home for learning resources and tutoring services.",
  },
  {
    name: "Conquer GCSE",
    image: "/conquer-gcse.png",
    category: "Student learning",
    description:
      "A digital space that brings revision resources closer to students.",
  },
];

export default function Portfolio() {
  return (
    <section id="examples" className="bg-[#f5f4ee] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-emerald-800 uppercase tracking-widest text-sm font-semibold mb-4">
          Built to make a difference
        </p>
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-stone-900 mb-5">
          Here are our best examples.
        </h2>
        <p className="text-lg text-stone-600 max-w-2xl mb-12">
          Real websites, designed around the people who use them. A few examples
          of what we build.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {examples.map((example) => (
            <article
              key={example.name}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200"
            >
              <a
                href={example.image}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${example.name} website screenshot`}
                className="block bg-stone-100 border-b border-stone-200"
              >
                <img
                  src={example.image}
                  alt={`${example.name} website screenshot`}
                  loading="lazy"
                  className="w-full aspect-[4/3] object-contain object-top hover:opacity-90 transition-opacity"
                />
              </a>
              <div className="p-7">
                <p className="text-sm text-emerald-800 mb-3">
                  {example.category}
                </p>
                <h3 className="text-2xl font-semibold mb-3">{example.name}</h3>
                <p className="text-stone-600">{example.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
