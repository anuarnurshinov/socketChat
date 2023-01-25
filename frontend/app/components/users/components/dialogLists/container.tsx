import { socket } from "@/app/api/socket"
import { useEffect } from "react"
import DialogsList from "./dialogsList"
import { selectAuthStatus } from "@/store/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { Dialog } from "@/app/types/users"
import { selectCurrentUser } from "../../../../../store/authSlice"
import { setAllDialogs } from "@/store/messageSlice"
const DialogsListContainer = () => {
  const auth = useSelector(selectAuthStatus)
  const user = useSelector(selectCurrentUser)
  const dispatch = useDispatch()

  useEffect(() => {
    if (auth && user) {
      socket.emit("findAllDialogs", user.id)
      socket.on("foundAllDialogs", (dialogs) => {
        dispatch(setAllDialogs(dialogs))
      })
    }
  }, [])

  return <DialogsList />
}

export default DialogsListContainer
