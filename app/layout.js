import { Inter} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header"
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const inter = Inter({subsets: ["latin"]})

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
          className={`${inter.className}`}
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
            <footer className=" border-t  py-8">
              <div className="container mx-auto px-4 text-center text-gray-200">
                <p>2025 &copy; All rights reserved.</p>
                <p className="text-[#F36B16]">Made with 💗 by Tushar Chandak</p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
