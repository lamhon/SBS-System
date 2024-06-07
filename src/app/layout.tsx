import type { Metadata } from "next"
import { ToastContainer } from "react-toastify"
import { Inter } from "next/font/google"
import "./globals.scss"
import "../../public/bootstrap-5.2.3/css/bootstrap.min.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SBS System",
  description: "SBS System Website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        {children}
      </body>
    </html>
  )
}
