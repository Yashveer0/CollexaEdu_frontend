import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppIcon = () => {
  return (
    <Link
      href="https://wa.me/919217070575"
      target="_blank"
      className="fixed bottom-6 mb-15 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300"
    >
      <FaWhatsapp size={18} />
    </Link>
  );
};

export default WhatsAppIcon;
