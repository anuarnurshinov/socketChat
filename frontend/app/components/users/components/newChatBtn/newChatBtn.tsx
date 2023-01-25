import {
  Box,
  Tooltip,
  IconButton,
  Modal,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { useState } from "react"
import {
  FieldValue,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form"

type newChatBtnProps = {
  createNewChat: (chatName: string) => void
}

const NewChatBtn: React.FC<newChatBtnProps> = ({ createNewChat }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box position={"relative"}>
      <Tooltip title={"Создать чат"}>
        <IconButton
          onClick={handleOpen}
          size="large"
          className="verticalCenter"
          aria-label="delete">
          <AddCircleIcon sx={{ color: "white" }} />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={styles.modal}>
          <Typography
            sx={{ mb: "1rem" }}
            id="modal-modal-title"
            variant="h6"
            component="h2">
            Создать новый чат
          </Typography>
          <NewChatForm
            handleClose={handleClose}
            createNewChat={createNewChat}
          />
        </Box>
      </Modal>
    </Box>
  )
}

export default NewChatBtn

type Inputs = {
  chatName: string
}
type NewChatFormProps = {
  createNewChat: (chatName: string) => void
  handleClose: () => void
}
const NewChatForm: React.FC<NewChatFormProps> = ({
  createNewChat,
  handleClose,
}) => {
  const { register, handleSubmit, getValues } = useForm()
  const onSubmit: SubmitHandler<FieldValues> = () => {
    handleClose()
    createNewChat(getValues("name"))
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <InputLabel htmlFor="createNewChat">Введите название</InputLabel>
        <OutlinedInput
          {...register("name")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="addNewChat" color="primary" type="submit">
                <AddCircleIcon />
              </IconButton>
            </InputAdornment>
          }
          id="createNewChat"
          color="info"></OutlinedInput>
      </FormControl>
    </form>
  )
}

const styles = {
  modal: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "6px",
    p: 4,
  },
}
