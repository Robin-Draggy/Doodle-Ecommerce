import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | MyStore",
  description: "Get in touch with MyStore support team",
};

export default function ContactPage() {
  return (
    <main className="bg-black text-white">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold">
          Contact <span className="text-[#FFBF00]">Us</span>
        </h1>

        <p className="mt-6 text-gray-400 max-w-xl mx-auto">
          Have questions? Need support? We’re here to help you anytime.
        </p>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 pb-20 grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="p-6 md:p-8 rounded-2xl border border-[#FFBF00]/20 bg-black">
          <h2 className="text-xl font-semibold mb-6">
            Send a Message
          </h2>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg bg-black border border-[#FFBF00]/20 text-white focus:outline-none focus:border-[#FFBF00]"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg bg-black border border-[#FFBF00]/20 text-white focus:outline-none focus:border-[#FFBF00]"
            />

            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full px-4 py-3 rounded-lg bg-black border border-[#FFBF00]/20 text-white focus:outline-none focus:border-[#FFBF00]"
            />

            <button
              type="submit"
              className="w-full py-3 bg-[#FFBF00] text-black font-semibold rounded-lg hover:scale-[1.02] transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Info Panel */}
        <div className="space-y-6">
          <div className="p-6 rounded-xl border border-[#FFBF00]/20">
            <Mail className="text-[#FFBF00]" />
            <h3 className="mt-2 font-semibold">Email</h3>
            <p className="text-gray-400 text-sm">support@mystore.com</p>
          </div>

          <div className="p-6 rounded-xl border border-[#FFBF00]/20">
            <Phone className="text-[#FFBF00]" />
            <h3 className="mt-2 font-semibold">Phone</h3>
            <p className="text-gray-400 text-sm">+880 1234-567890</p>
          </div>

          <div className="p-6 rounded-xl border border-[#FFBF00]/20">
            <MapPin className="text-[#FFBF00]" />
            <h3 className="mt-2 font-semibold">Location</h3>
            <p className="text-gray-400 text-sm">
              Dhaka, Bangladesh
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}