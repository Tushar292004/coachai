// import { Inter} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header"
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'], // Choose subsets as per requirement
  weight: ['400', '500', '700'], // Specify font weights you need
  variable: '--font-dm-sans' // Optional: Custom CSS variable for easy usage
});

export const metadata = {
  title: "Coach AI - Career Coach",
  description: "Helps you in all most crucial career aspects",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={
      {
        baseTheme:dark,
      }
    }>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${dmSans.className}`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark" //dark, light
            enableSystem
            disableTransitionOnChange
          >
            {/* header */}
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            {/* footer */}
            <footer className=" border-t py-6">
              <div className="container mx-auto px-4 text-center text-gray-200">
                <p>2025 &copy; All rights reserved.</p>
                <p className="text-[#00D8FF]">Made with 💗 by Tushar Chandak</p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
