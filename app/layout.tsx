
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackToTop from "./(components)/BackToTop";


import ClientLayout from "./ClientLayout/page";

import { AuthProvider } from "./context/AuthContext";

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
    <html data-scroll-behavior="smooth" lang="en">
      <link rel="icon" href="/favicon-round.ico" />

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > 

         <AuthProvider>        
       <ClientLayout>
        {children}
        <BackToTop />
        </ClientLayout>
       </AuthProvider>
       
      </body>
    </html>
  );
}
