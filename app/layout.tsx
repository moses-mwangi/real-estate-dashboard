import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--Inter",
});

export const metadata: Metadata = {
  title: "Bomac Dashboard",
  description: "The best real estate company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/image copy.png" type="image/png" />
      </head>
      <body
        className={`${cn(inter.variable)}`}
        style={{ fontFamily: "var(--Inter)" }}
      >
        <Toaster position="top-center" />
        <div>
          <div>
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
