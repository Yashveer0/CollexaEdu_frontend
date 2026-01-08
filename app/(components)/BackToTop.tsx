"use client";

import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-6 z-50
        w-11 h-11 rounded-full
        bg-[#0B2B6B] text-white
        flex items-center justify-center
        shadow-lg
        transition-all duration-300
        hover:bg-[#123c9c] hover:scale-110
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
      aria-label="Back to top"
    >
      <FiArrowUp size={20} />
    </button>
  );
}
