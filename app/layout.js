// import { Inter} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header"
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Analytics } from "@vercel/analytics/react"
import { DM_Sans } from 'next/font/google';
import { toast, ToastContainer } from "react-toastify";

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
    <ClerkProvider appearance={{
      baseTheme: [dark],
      variables: {
        colorPrimary: '#00D8FF',
        colorText: "#00D8FF",
        colorTextSecondary:"white"
      },
    }}>
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
              <Analytics />
            </main>
            <ToastContainer />
            {/* footer */}
            <footer className=" border-t py-6">
              <div className="container mx-auto px-4 text-center text-gray-200 font-medium">
                <p>2025 &copy; All rights reserved.</p>
                <a href="https://www.linkedin.com/in/tusharchandak29/" className="text-[#00D8FF]">Made with 🤍 by Tushar Chandak</a>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
