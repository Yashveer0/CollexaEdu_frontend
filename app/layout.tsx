import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackToTop from "./(components)/BackToTop";
import Navbar from "./(components)/Navbar";
import Footer from "./(components)/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > 
       <Navbar />
        {children}
        <BackToTop />
       <Footer />
      </body>
    </html>
  );
}
