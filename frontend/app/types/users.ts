export interface UserDTO {
  name: string
  password: string
}

export interface User extends UserDTO {
  id: number
  name: string
  dialogs: DialogOnUsers[]
  messages: Message[]
}

export interface DialogOnUsers {
  user: User
  userId: number
  dialog: Dialog
  dialogId: number
}

export interface Dialog {
  id: number
  isPrivate: boolean
  name: string
  messages?: Message[]
  users?: DialogOnUsers[]
}

export interface Message {
  id: number
  body: string
  dialog: Dialog
  dialogId: number
  createdAt: string
  user: User
  userId: number
}

export interface MessageDTO {
  body: string
  dialogId: number
  userId: number
}
