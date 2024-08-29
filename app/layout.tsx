"use client";

// import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppProps } from "next/app";

const theme = createTheme({
  palette: {
    mode: "light", // or 'dark' for dark mode
  },
});

const meriwether = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--Merriweather",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--Inter",
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cn(inter.variable)}`}
        style={{ fontFamily: "var(--Inter)" }}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Toaster position="top-center" />
          <div>
            <div>
              <main>{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
