import { io } from "socket.io-client"
import Cookies from "universal-cookie"

export const socket = io("http://localhost:3001", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd",
  },
})
