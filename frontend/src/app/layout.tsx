import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/header/Header'
import { StoreProvider } from './redux/StoreProvider'
import Basket from '@/components/basket/Basket'
import Footer from '@/components/footer/Footer'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'fruit shop',
    description: 'pabd',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <StoreProvider>
            <html lang="en">
                <body className={`${geistSans.variable} ${geistMono.variable}`}>
                    <Basket />
                    <Header />
                    {children}
                    <Footer />
                </body>
            </html>
        </StoreProvider>
    )
}
