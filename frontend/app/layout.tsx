"use client"
import { wrapper } from "@/store/store"
import Script from "next/script"
import "./globals.scss"
import { socket } from "app/api/socket"

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>{children}</body>
    </html>
  )
}

export default wrapper.withRedux(RootLayout)
