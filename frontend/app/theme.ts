import { createTheme } from "@mui/material"
import { Oswald, Balsamiq_Sans } from "@next/font/google"

const balsamiq = Balsamiq_Sans({
  weight: ["400", "700"],
  subsets: ["latin", "cyrillic"],
})

const theme = createTheme({
  typography: {
    fontFamily: [balsamiq.style.fontFamily].join(","),
  },
})

export default theme
