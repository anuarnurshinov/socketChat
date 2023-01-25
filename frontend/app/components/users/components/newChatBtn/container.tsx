import NewChatBtn from "./newChatBtn"
import { socket } from "@/app/api/socket"
import { useDispatch, useSelector } from "react-redux"
import { selectAuthStatus } from "@/store/authSlice"
import { Dialog, DialogOnUsers } from "@/app/types/users"
import { selectCurrentUser } from "../../../../../store/authSlice"
import { setOneDialog } from "@/store/messageSlice"

const NewChatBtnContainer = () => {
  const user = useSelector(selectCurrentUser)
  const dispatch = useDispatch()

  const createNewChat = (name: string) => {
    if (user?.id) {
      socket.emit("createDialog", {
        name,
        userId: user.id,
      })
      socket.on("dialogCreated", (data) => {
        socket.off("dialogCreated")
        dispatch(setOneDialog(data))
      })
    }
  }
  return <NewChatBtn createNewChat={createNewChat} />
}

export default NewChatBtnContainer
