import { Box, Typography, TextField, IconButton, Avatar } from "@mui/material"
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions"
import AttachFileIcon from "@mui/icons-material/AttachFile"
import SendIcon from "@mui/icons-material/Send"
import { useDispatch, useSelector } from "react-redux"
import {
  ChangeEvent,
  MouseEventHandler,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react"
import { selectCurrentDialog, selectMessages } from "@/store/messageSlice"
import { CSSTransition, Transition } from "react-transition-group"
import Conditional from "@/app/utils/conditional"
import { Dialog, Message } from "@/app/types/users"
import { selectCurrentUser } from "@/store/authSlice"
import Image from "next/image"
import bean from "@/public/bean.png"
type MessagesProps = {
  currentDialog: Dialog | null
  setIsSearch: (status: boolean) => void
  isSearch: boolean
  sendMessageHandler: (message: string) => void
}
const duration = 1000
const defaultStyle = {
  transition: `width ${duration}ms ease`,
  width: "45%",
  borderRadius: "6px",
}
const transitionStyles = {
  entering: { width: "45%" },
  entered: { width: "100%" },
  exiting: {},
  exited: {},
  unmounted: {},
}

const Messages: React.FC<MessagesProps> = ({
  currentDialog,
  sendMessageHandler,
  isSearch,
  setIsSearch,
}) => {
  const nodeRef = useRef(null)
  return (
    <Transition ref={nodeRef} in={isSearch} timeout={0}>
      {(state) => (
        <Box
          ref={nodeRef}
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
          sx={{
            ...styles.mainContainer,
          }}>
          <Conditional showWhen={!isSearch}>
            <ChatName currentDialog={currentDialog} />
            <MessagesList isSearch={isSearch} />
            {currentDialog ? (
              <TextInputBlock sendMessageHandler={sendMessageHandler} />
            ) : (
              ""
            )}
          </Conditional>
          <Conditional showWhen={isSearch}>
            <DialogsList />
          </Conditional>
        </Box>
      )}
    </Transition>
  )
}

const DialogsList = () => {
  return (
    <Box className="verticalCenter" sx={{ width: "fit-content", m: "0 auto" }}>
      <Image src={bean} alt="bean"></Image>
    </Box>
  )
}

type chatNameProps = {
  currentDialog: Dialog | null
}
const ChatName: React.FC<chatNameProps> = ({ currentDialog }) => {
  return (
    <Box sx={styles.loginAndOnlineStatus.container}>
      <Typography sx={{ pl: "2rem" }} className="verticalCenter" variant="h4">
        {currentDialog ? currentDialog.name : ""}
      </Typography>
    </Box>
  )
}

type messageListProps = {
  isSearch: boolean
}
const MessagesList: React.FC<messageListProps> = ({ isSearch }) => {
  const getTime = (date: string) => {
    const dateMS = new Date(Date.parse(date))

    const h = dateMS.getHours()
    const m = dateMS.getMinutes()
    if (m <= 9) return `${h}:0${m}`
    return `${h}:${m}`
  }

  const messages = useSelector(selectMessages)
  const currentUser = useSelector(selectCurrentUser)
  let messagesEnd: HTMLElement | null
  useEffect(() => {
    if (messagesEnd) messagesEnd.scrollIntoView({ behavior: "smooth" })
  }, [messages])
  console.log(messages)

  return (
    <Box sx={styles.messagesList.container}>
      {messages
        ? messages?.map((el: Message) => {
            if (el.userId === currentUser?.id)
              return (
                <Box
                  key={el.id}
                  justifyContent={"flex-start"}
                  gap={"1rem"}
                  display={"flex"}
                  flexDirection={"row"}>
                  <Box>
                    {" "}
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
                    <Typography paddingTop={"0.5rem"} textAlign={"center"}>
                      {getTime(el.createdAt)}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      bgcolor: "#eaeaea",
                      p: "1rem",
                      borderRadius: "0px 10px 10px 10px",
                    }}>
                    <Typography color={"#007afd"}>{el.user.name}</Typography>
                    <Typography>{el.body}</Typography>
                  </Box>
                </Box>
              )
            else
              return (
                <Box
                  key={el.id}
                  justifyContent={"flex-end"}
                  alignItems={"flex-start"}
                  gap={"1rem"}
                  display={"flex"}
                  flexDirection={"row"}>
                  <Box
                    sx={{
                      bgcolor: "#007afd",
                      p: "1rem",
                      borderRadius: "10px 0px 10px 10px",
                    }}>
                    {" "}
                    <Typography textAlign={"end"} color={"white"}>
                      {el.user.name}
                    </Typography>
                    <Typography textAlign={"end"}>{el.body}</Typography>
                  </Box>
                  <Box>
                    {" "}
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
                    <Typography paddingTop={"0.5rem"} textAlign={"center"}>
                      {getTime(el.createdAt)}
                    </Typography>
                  </Box>
                </Box>
              )
          })
        : ""}
      <div
        style={{ float: "left", clear: "both" }}
        ref={(el) => {
          messagesEnd = el
        }}></div>
    </Box>
  )
}

type TextInputProps = {
  sendMessageHandler: (message: string) => void
}

const TextInputBlock: React.FC<TextInputProps> = ({ sendMessageHandler }) => {
  const [value, setValue] = useState("")

  const sendHandler = (key: string) => {
    if (key === "Enter") {
      sendMessageHandler(value)
      setValue("")
    }
  }

  return (
    <Box sx={{ height: "14%", position: "relative", p: "1rem" }}>
      <TextField
        className="verticalCenter"
        fullWidth
        id="outlined-multiline-flexible"
        label={"Введите сообщение"}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setValue(e.target.value)
        }}
        onKeyDown={(e) => {
          sendHandler(e.key)
        }}
        maxRows={2}
      />
      <Box
        position={"absolute"}
        top={"50%"}
        right={"5%"}
        sx={{ transform: "translate(0, -50%)" }}>
        <IconButton aria-label="smiles">
          <EmojiEmotionsIcon />
        </IconButton>
        <IconButton aria-label="addFile">
          <AttachFileIcon />
        </IconButton>
        <IconButton
          aria-label="send"
          onClick={(e) => {
            setValue("")
          }}>
          <SendIcon sx={{ color: "#007afe" }} />
        </IconButton>
      </Box>
    </Box>
  )
}

const styles = {
  mainContainer: {
    bgcolor: "whitesmoke",
    position: "relative",
  },
  loginAndOnlineStatus: {
    container: {
      boxShadow: "0px 14px 8px 0px rgba(34, 60, 80, 0.2)",
      height: "12%",
    },
  },
  messagesList: {
    container: {
      "&::-webkit-scrollbar": {
        display: "none",
      },
      overflow: "scroll",
      gap: "1rem",
      display: "flex",
      flexDirection: "column",
      height: "74%",
      p: "1.5rem",
    },
  },
}
export default Messages
