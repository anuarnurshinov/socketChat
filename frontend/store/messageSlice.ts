import { Dialog, Message } from "@/app/types/users"
import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"
import { AppState } from "./store"

interface Action<T> {
  type: string
  payload: T
}
export type MessageState = {
  messages: Message[]
  dialogs: Dialog[]
  currentDialog: Dialog | null
}

const initialState: MessageState = {
  messages: [],
  dialogs: [],
  currentDialog: null,
}

export const messageSlice = createSlice({
  name: "dialogs",
  initialState,
  reducers: {
    setMessages(state, action: Action<Message[]>) {
      state.messages = action.payload
    },
    addNewMessage(state, action: Action<Message>) {
      state.messages = [...state.messages, action.payload]
    },
    setAllDialogs(state, action: Action<Dialog[]>) {
      state.dialogs = action.payload
    },
    setOneDialog(state, action: Action<Dialog>) {
      state.dialogs = [...state.dialogs, action.payload]
    },
    setCurrentDialog(state, action: Action<Dialog>) {
      state.currentDialog = action.payload
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("HYDRATE", action.payload)
      return {
        ...state,
        ...action.payload.auth,
      }
    },
  },
})

export const {
  addNewMessage,
  setMessages,
  setAllDialogs,
  setOneDialog,
  setCurrentDialog,
} = messageSlice.actions

export const selectMessages = (state: AppState) => state.dialogs.messages
export const selectAllDialogs = (state: AppState) => state.dialogs.dialogs
export const selectCurrentDialog = (state: AppState) =>
  state.dialogs.currentDialog

export default messageSlice.reducer
