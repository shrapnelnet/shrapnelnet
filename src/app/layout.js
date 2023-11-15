import { Inter } from "next/font/google"
import "./globals.css"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { darkTheme } from "@/components/Theme"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
    title: "Shrapnelnet",
    description: "A microblog that truly nobody wanted or needed"
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider theme={darkTheme}>
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}
