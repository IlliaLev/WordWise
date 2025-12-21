import type { Metadata } from "next";

export const metadata: Metadata = {
  icons: {
    icon: "/logo-tab.svg",
  },
};

import "./globals.css";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body>
          <ScrollToTopButton></ScrollToTopButton>
          {children}
      </body>
    </html>
  );
}
