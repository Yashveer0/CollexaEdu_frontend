"use client";

import { usePathname } from "next/navigation";
import Navbar from "../(components)/Navbar";
import Footer from "../(components)/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // ❌ hide on admin pages
  const hideLayout =
    pathname.startsWith("/admin") ||
    pathname === "/admin-login" || pathname === "/student-login" || pathname === "/register" || pathname === "/employer-login";

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}
