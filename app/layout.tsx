import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import BackToTop from "./(components)/BackToTop";
import WhatsAppIcon from "./(components)/WhatsAppIcon";
import ClientLayout from "./ClientLayout/page";
import { AuthProvider } from "./context_api/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Added Poppins
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Collexa Edu",
  description: "Building careers with campus jobs, internships and industry-ready courses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-scroll-behavior="smooth" lang="en">
      <link rel="icon" href="/favicon-round.ico" />

      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          ${poppins.className} 
          antialiased
        `}
      >
        <AuthProvider>
          <ClientLayout>
            {children}
            <BackToTop />
            <WhatsAppIcon />
          </ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
