import type { Metadata } from "next";
import { Shield, Truck, Sparkles, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | MyStore",
  description: "Learn more about MyStore and our mission",
};

export default function AboutPage() {
  const values = [
    {
      icon: Sparkles,
      title: "Premium Quality",
      desc: "We carefully curate products to ensure top-tier quality.",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      desc: "Reliable and fast shipping across all regions.",
    },
    {
      icon: Shield,
      title: "Secure Shopping",
      desc: "Your data and payments are always protected.",
    },
    {
      icon: Users,
      title: "Customer First",
      desc: "We prioritize customer satisfaction above everything.",
    },
  ];

  return (
    <main className="bg-black text-white">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold">
          About <span className="text-[#FFBF00]">MyStore</span>
        </h1>

        <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
          We are building a modern ecommerce experience focused on performance,
          design, and customer satisfaction. Every product is selected with care.
        </p>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Our Mission</h2>
          <p className="text-gray-400 leading-relaxed">
            To create a seamless shopping experience where users can discover,
            explore, and purchase products without friction. We combine modern
            web technologies with user-first design principles.
          </p>
        </div>

        <div className="p-8 rounded-2xl border border-[#FFBF00]/20 bg-gradient-to-br from-black to-gray-900">
          <p className="text-[#FFBF00] text-2xl font-bold">
            “Simple. Fast. Reliable.”
          </p>
          <p className="text-gray-400 mt-4">
            Built with Next.js, designed for performance, optimized for scale.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Why Choose Us
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div
              key={v.title}
              className="p-6 rounded-xl border border-[#FFBF00]/20 bg-black hover:border-[#FFBF00]/60 transition"
            >
              <v.icon className="w-6 h-6 text-[#FFBF00]" />
              <h3 className="mt-4 font-semibold">{v.title}</h3>
              <p className="text-gray-500 text-sm mt-2">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}