import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'A score of 0 to 100',
  description: 'alice has a score of 42. Over 100 is refused. The object is not signed.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
