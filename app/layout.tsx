
import { ThemeSwitcher } from "@/components/theme-switcher";
import { NavBar } from "@/components/site/NavBar";
import { Footer } from "@/components/site/Footer";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Header from "@/components/hero";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}> ) {

 
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-0 items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-18">
               <NavBar />
              </nav>
              {/* Hero Header */}
              <div className="flex color-white hero flex-col gap-10 w-full bg-black min-h-[500px]">
               {<Header videos={[]} />}
              </div>
              <div className="flex flex-col gap-20 max-w-5xxl p-5">
                {children}
              </div>

             <Footer />
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
