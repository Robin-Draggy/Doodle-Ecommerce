import { Shield, Truck, Headphones } from "lucide-react";

export const WhyChooseUs = () => {
  const items = [
    {
      icon: Shield,
      title: "Secure Payments",
      desc: "100% secure checkout with encryption",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      desc: "Quick worldwide shipping",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      desc: "Always here to help you",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.title}
            className="p-6 rounded-xl border border-[#FFBF00]/20 bg-black hover:border-[#FFBF00]/50 transition"
          >
            <item.icon className="w-6 h-6 text-[#FFBF00]" />

            <h3 className="mt-4 text-white font-semibold">
              {item.title}
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};