import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TheGrant.Ninja — We Write The Grant. You Cash The Check.',
  description: 'Professional grant writing services. We handle the entire application — you keep the award. Flat-fee or performance-based options available.',
  keywords: 'grant writing, grant application, grant writer, federal grants, nonprofit grants',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
