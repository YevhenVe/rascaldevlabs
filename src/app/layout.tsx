import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Header from "@/components/Header/Header";
import "./globals.scss";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Rascal Dev Labs",
  description: "Rascal Dev Labs project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
