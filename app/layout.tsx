import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Roboto } from "next/font/google";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Track your expenses and calculate your budget.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider signUpForceRedirectUrl={"/"}>
      <html lang="en">
        <body className={roboto.className}>
          <Header />
          <main className="container">
            {children}
          </main>
          <ToastContainer />
        </body>
      </html>
    </ClerkProvider>

  );
}
