"use client"
import { Container } from "@mui/system"
import { Box, Grow, ThemeProvider } from "@mui/material"
import theme from "./theme"
import Users from "./components/users/users"
import Messages from "./components/messages/messages"
import Profile from "./components/profile"
import MessageContainer from "./components/messages/container"
import { useSelector } from "react-redux"
import { selectAuthStatus } from "@/store/authSlice"
import Authorization from "./components/auth/auth"
import { useEffect, useState } from "react"
import Conditional from "./utils/conditional"
import AuthContainer from "./components/auth/container"

export default function Home() {
  const auth = useSelector(selectAuthStatus)
  const [isSearch, setIsSearch] = useState(false)
  return (
    <ThemeProvider theme={theme}>
      {/* Главная страница */}
      <Grow in={auth}>
        <Container
          disableGutters
          sx={{ ...styles.container, display: auth ? "flex" : "none" }}>
          <Conditional showWhen={auth}>
            {/* Левая часть */}
            <Users setIsSearch={setIsSearch} />
            {/* Центральная часть */}
            <MessageContainer setIsSearch={setIsSearch} isSearch={isSearch} />
            {/* Правая часть */}
          </Conditional>
        </Container>
      </Grow>
      {/* Страница входа и регистрации */}
      <Grow in={!auth}>
        <Container sx={{ mt: 10 }}>
          <Conditional showWhen={!auth}>
            <AuthContainer />
          </Conditional>
        </Container>
      </Grow>
    </ThemeProvider>
  )
}

const styles = {
  container: {
    justifyContent: "center",
    height: "80%",
    mt: 10,
  },
}
