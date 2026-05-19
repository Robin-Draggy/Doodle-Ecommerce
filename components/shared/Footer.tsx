import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-[#FFBF00]/20 bg-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <Link 
              href="/" 
              className="group flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <div className="w-8 h-8 bg-[#FFBF00] rounded-lg flex items-center justify-center transition-all duration-300 group-hover:rotate-6 shadow-lg shadow-[#FFBF00]/25">
                <span className="text-black font-bold text-xl">D</span>
              </div>
              <p className="text-[#FFBF00] font-bold text-xl lg:text-2xl tracking-wide transition-all duration-300 group-hover:tracking-wider">
                Doodle
              </p>
            </Link>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">
              A modern ecommerce platform built for performance, scalability,
              and premium user experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-white">
              Quick Links
            </h3>

            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-[#FFBF00] transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#FFBF00] transition">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#FFBF00] transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FFBF00] transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-white">
              Support
            </h3>

            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FFBF00]" />
                support@mystore.com
              </li>

              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FFBF00]" />
                +880 1234-567890
              </li>

              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#FFBF00]" />
                Dhaka, Bangladesh
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-white">
              Newsletter
            </h3>

            <p className="text-gray-400 text-sm mb-3">
              Get updates on new products and offers.
            </p>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 rounded-lg bg-black border border-[#FFBF00]/20 text-white focus:outline-none focus:border-[#FFBF00]"
              />

              <button className="px-4 py-2 bg-[#FFBF00] text-black font-semibold rounded-lg hover:opacity-90 transition">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#FFBF00]/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">

          <p>
            © {new Date().getFullYear()} MyStore. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link href="#" className="hover:text-[#FFBF00] transition">
              Privacy
            </Link>
            <Link href="#" className="hover:text-[#FFBF00] transition">
              Terms
            </Link>
            <Link href="#" className="hover:text-[#FFBF00] transition">
              Cookies
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
};