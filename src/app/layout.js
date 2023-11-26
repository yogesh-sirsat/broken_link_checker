import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Broken Link Checker',
  description: 'Finds out the links that return a 404.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body className={inter.className  + " bg-base-200"}>{children}</body>
    </html>
  )
}
