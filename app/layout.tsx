import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
// import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import { Trirong } from "next/font/google";

// Import Trirong font
const trirong = Trirong({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-trirong",
});

// Metadata
export const metadata: Metadata = {
  title: "ARCL",
  description: "ARCL Website",
};

// Viewport
export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

// Root layout
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${trirong.variable} font-serif antialiased`}>
        {/* <Navbar /> */}
        {children}
        {/* <Footer /> */}
        {/* <ScrollToTopButton /> */}
      </body>
    </html>
  );
}
