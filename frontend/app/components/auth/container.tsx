import { socket } from "@/app/api/socket"
import { User, UserDTO } from "@/app/types/users"
import { setUser } from "@/store/authSlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import Authorization from "./auth"
import Cookie from "universal-cookie"

const AuthContainer = () => {
  const dispatch = useDispatch()
  useEffect(() => {}, [])

  const cookies = new Cookie()
  const currentCookie = cookies.get("access_token")
  if (currentCookie) {
    socket.emit("isValidToken", currentCookie)
    socket.on("tokenResponse", (user) => {
      if (user) dispatch(setUser(user))
    })
  }

  const createUserHandler = (user: UserDTO) => {
    socket.on("userCreated", function (user: User) {
      dispatch(setUser(user))
      if (user) {
        socket.off("userCreated")
      }
    })
    socket.emit("createUser", user)
  }
  const loginUserHandler = (user: UserDTO) => {
    socket.emit("loginUser", user)
    socket.on("loginSuccess", (result) => {
      const { access_token, ...user } = result
      const cookies = new Cookie()
      dispatch(setUser(user))
      cookies.set("access_token", access_token)
      socket.off("loginSuccess")
    })
  }
  return (
    <Authorization
      createUserHandler={createUserHandler}
      loginUserHandler={loginUserHandler}
    />
  )
}

export default AuthContainer
