import { ThemeSwitcher } from "@/components/theme-switcher";
import { NavBar } from "@/components/site/NavBar";
import { Footer } from "@/components/site/Footer";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "VLOG | Video Feed",
  description: "Video blog website built with Next.js and Supabase",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="w-full min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-0 items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-18">
                <NavBar />
              </nav>

              <div className="w-full flex flex-col gap-3  px-0">{children}</div>

              <Footer />
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
