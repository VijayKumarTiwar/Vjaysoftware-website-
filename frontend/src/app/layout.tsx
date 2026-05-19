import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vjay Software PVT Ltd — Engineering the Future",
  description: "Vjay Software PVT Ltd is a premier Indian IT company delivering innovative software solutions since over a decade. We combine technical rigor with business insight.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
