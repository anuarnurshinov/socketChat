"use client"
import { socket } from "@/app/api/socket"
import { addNewMessage, setMessages } from "@/store/messageSlice"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { io } from "socket.io-client"
import Messages from "./messages"
import { selectCurrentDialog } from "../../../store/messageSlice"
import { selectCurrentUser } from "@/store/authSlice"
import { Message, MessageDTO } from "@/app/types/users"

type MessageContainerProps = {
  isSearch: boolean
  setIsSearch: (status: boolean) => void
}

const MessageContainer: React.FC<MessageContainerProps> = ({
  isSearch,
  setIsSearch,
}) => {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const currentDialog = useSelector(selectCurrentDialog)

  useEffect(() => {
    socket.emit("findAllMessages", currentDialog?.id)
    socket.on("foundAllMessages", (messages) => {
      dispatch(setMessages(messages))
      socket.off("foundAllMessages")
    })
    socket.on("newMessage", (message: Message) => {
      if (message.dialogId === currentDialog?.id) {
        dispatch(addNewMessage(message))
      }
    })
  }, [currentDialog])

  const sendMessageHandler = (body: string) => {
    if (currentDialog && currentUser) {
      const message: MessageDTO = {
        body,
        dialogId: currentDialog.id,
        userId: currentUser.id,
      }
      socket.emit("createMessage", message)
    }
  }

  return (
    <Messages
      currentDialog={currentDialog}
      setIsSearch={setIsSearch}
      isSearch={isSearch}
      sendMessageHandler={sendMessageHandler}
    />
  )
}
export default MessageContainer
