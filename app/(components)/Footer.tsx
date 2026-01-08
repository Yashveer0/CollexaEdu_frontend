import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";


export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto text-2xl px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Left Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Image 
              src="/logo.png" 
              alt="Collexa Edu Logo" 
              width={140} 
              height={140}
            />
            
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            Building careers with campus jobs,<br />
            internships and industry-ready courses.
          </p>

          <div className="flex gap-4 text-gray-600">
            <Link href="#" aria-label="Facebook" className="hover:text-white hover:bg-blue-700 p-3  border border-gray-400 rounded-full">
              <FaFacebookF size={18} />
            </Link>
            <Link href="#" aria-label="Instagram" className="hover:text-white hover:bg-blue-700 p-3  border border-gray-400 rounded-full">
              <FaInstagram size={18} />
            </Link>
            <Link href="#" aria-label="LinkedIn" className="hover:text-white hover:bg-blue-700 p-3  border border-gray-400 rounded-full">
              <FaLinkedinIn size={18} />
            </Link>
            <Link href="#" aria-label="Twitter" className="hover:text-white hover:bg-blue-700 p-3  border border-gray-400 rounded-full">
              <FaTwitter size={18} />
            </Link>
          </div>
        </div>

        {/* Explore */}
        <div>
          <h3 className="font-semibold text-blue-900 mb-4">Explore</h3>
          <ul className="space-y-2 text-gray-600 text-lg">
            <li><Link href="/jobs" className="hover:text-blue-700">Campus Jobs</Link></li>
            <li><Link href="/internship" className="hover:text-blue-700">Internships</Link></li>
            <li><Link href="/campus-courses" className="hover:text-blue-700">Skill Courses</Link></li>
            <li><Link href="/register" className="hover:text-blue-700">For Employers</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-blue-900 mb-4">Company</h3>
          <ul className="space-y-2 text-gray-600 text-lg">
            <li><Link href="/about" className="hover:text-blue-700">About</Link></li>
            <li><Link href="/contact" className="hover:text-blue-700">Contact</Link></li>
            <li><Link href="/jobs" className="hover:text-blue-700">Careers</Link></li>
            <li><Link href="#" className="hover:text-blue-700">Blog</Link></li>
          </ul>
        </div>

        {/* Subscribe */}
        <div>
          <h3 className="font-semibold text-blue-900 mb-4">Subscribe</h3>
          <p className="text-gray-600 text-sm mb-3">
            Get career tips, new jobs and course offers in your inbox.
          </p>

          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="border rounded-md text-sm text-black px-3 py-2 w-full outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-700 text-nowrap hover:bg-blue-800 text-white rounded-md px-5 py-2"
            >
              Join →
            </button>
          </form>

          <p className="text-gray-500 text-xs mt-2">
            By subscribing, you agree to our Terms & Privacy.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between text-sm text-gray-600">
          <p>© 2025 <span className="font-semibold">Collexa Edu.</span> All rights reserved.</p>

          <div className="flex gap-6 mt-2 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-blue-700">Privacy</Link>
            <Link href="/terms" className="hover:text-blue-700">Terms</Link>
            <Link href="/contact" className="hover:text-blue-700">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
