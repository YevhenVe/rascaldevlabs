import type { Metadata } from "next";
import { Poppins, Bebas_Neue } from "next/font/google";
import { cookies } from "next/headers";
import CookieConsent from "@/components/CookieConsent/CookieConsent";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ThemeSync from "@/components/ThemeSync/ThemeSync";
import { AuthProvider } from "@/context/AuthContext";
import { THEME_KEY, type Theme } from "@/lib/theme";
import "./globals.scss";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Rascal Dev Labs",
  description:
    "Your dedicated solo architect for pixels and backend systems. From ideas to flawless execution, Rascal Dev Labs delivers.",
};

function resolveTheme(value: string | undefined): Theme {
  return value === "dark" || value === "light" ? value : "light";
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = resolveTheme(cookieStore.get(THEME_KEY)?.value);

  return (
    <html
      lang="en"
      className={`${poppins.variable} ${bebasNeue.variable}`}
      data-theme={theme}
      suppressHydrationWarning
    >
      <body className={poppins.className}>
        <AuthProvider>
          <ThemeSync />
          <Header />
          {children}
          <Footer />
          <CookieConsent />
        </AuthProvider>
      </body>
    </html>
  );
}
