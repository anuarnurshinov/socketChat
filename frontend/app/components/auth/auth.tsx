import Conditional from "@/app/utils/conditional"
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  Grow,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material"
import Alert from "@mui/material/Alert"
import AlertTitle from "@mui/material/AlertTitle"
import Image from "next/image"
import avatar from "public/avatar.png"
import { useState } from "react"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import Visibility from "@mui/icons-material/Visibility"
import { UserDTO } from "@/app/types/users"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

type AuthProps = {
  createUserHandler: (user: UserDTO) => void
  loginUserHandler: (user: UserDTO) => void
}
const Authorization: React.FC<AuthProps> = ({
  createUserHandler,
  loginUserHandler,
}) => {
  const [isLogin, setLogin] = useState(false)
  const [isRegis, setRegis] = useState(false)

  return (
    <>
      <Box sx={styles.container}>
        <Conditional showWhen={!isRegis && !isLogin}>
          <PreviewWindow
            currentPageState={{ setRegis, setLogin, isLogin, isRegis }}
          />
        </Conditional>

        <Conditional showWhen={isRegis || isLogin}>
          <RegistrationWindow
            loginUserHandler={loginUserHandler}
            setLogin={setLogin}
            isLogin={isLogin}
            createUserHandler={createUserHandler}
            isRegis={isRegis}
            setRegis={setRegis}
          />
        </Conditional>
      </Box>
    </>
  )
}

export default Authorization

type PreviewWindowProps = {
  currentPageState: {
    setRegis: (status: boolean) => void
    setLogin: (status: boolean) => void
    isLogin: boolean
    isRegis: boolean
  }
}
const PreviewWindow: React.FC<PreviewWindowProps> = ({ currentPageState }) => {
  return (
    <Grow in={!currentPageState.isRegis && !currentPageState.isLogin}>
      <Box>
        <Box sx={styles.imageContainer}>
          <Image style={styles.image} src={avatar} alt={"avatar"} />
        </Box>
        <Box sx={{ width: "fit-content", m: "1rem auto" }}>
          <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="Disabled elevation buttons"
            sx={styles.button}>
            <Button
              onClick={() => {
                currentPageState.setLogin(true)
              }}>
              Вход
            </Button>
            <Button
              onClick={() => {
                currentPageState.setRegis(true)
              }}>
              Регистрация
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Grow>
  )
}

type RegWindowProps = {
  loginUserHandler: (user: UserDTO) => void
  createUserHandler: (user: UserDTO) => void
  setRegis: (status: boolean) => void
  setLogin: (status: boolean) => void
  isRegis: boolean
  isLogin: boolean
}

const RegistrationWindow: React.FC<RegWindowProps> = ({
  setRegis,
  isRegis,
  createUserHandler,
  isLogin,
  setLogin,
  loginUserHandler,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm()
  const onSubmit: SubmitHandler<FieldValues> = () => {
    if (isRegis)
      createUserHandler({
        name: getValues("name"),
        password: getValues("password"),
      })
    else {
      loginUserHandler({
        name: getValues("name"),
        password: getValues("password"),
      })
    }
  }
  return (
    <Grow in={isRegis || isLogin}>
      <Box>
        <Typography
          align="center"
          color={"white"}
          fontWeight={700}
          variant={"h3"}>
          {isRegis ? "Регистрация" : "Вход"}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl margin="normal" fullWidth>
            <InputLabel sx={{ color: "white" }} htmlFor="isLogin">
              Login
            </InputLabel>

            <OutlinedInput
              {...register("name", { required: true })}
              sx={styles.textField}
              id="isLogin"
            />
            {errors.login && <span>This field is required</span>}
          </FormControl>
          <FormControl fullWidth>
            <InputLabel sx={{ color: "white" }} htmlFor="Password">
              Password
            </InputLabel>
            <OutlinedInput
              {...register("password", { required: true })}
              sx={styles.textField}
              id="Password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    sx={{ color: "white" }}
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          {errors.password && (
            <Box>
              <Alert severity="error">Обязательное поле</Alert>
            </Box>
          )}
          <Box
            sx={{
              width: "fit-content",
              m: "1rem auto",
            }}>
            <ButtonGroup
              disableElevation
              variant="contained"
              aria-label="Disabled elevation buttons"
              sx={styles.button}>
              <Button
                onClick={() => {
                  if (isRegis) setRegis(false)
                  if (isLogin) setLogin(false)
                }}>
                Назад
              </Button>
              <Button type={"submit"}>{isLogin ? "Войти" : "Создать"}</Button>
            </ButtonGroup>
          </Box>
        </form>
      </Box>
    </Grow>
  )
}

const styles = {
  container: {
    background: "linear-gradient(190deg, #007afd 0%, #0079ff 100%)",
    borderRadius: "6px",
    width: "30rem",
    margin: "0 auto",
    padding: "2rem",
    height: "fit-content",
  },
  imageContainer: {
    width: "17rem",
    height: "17rem",
    borderRadius: "50%",
    overflow: "hidden",
    margin: "0 auto",
  },
  image: {
    backgroundImage: "linear-gradient(to bottom,#0079ff, #8e2de2 )",
    width: "100%",
    transform: "scale(1.15)",
    height: "100%",
  },
  button: {
    "& .MuiButtonGroup-grouped:not(:last-of-type)": {
      borderRight: "none",
    },

    "& .MuiButtonBase-root": {
      padding: "2rem",
      backgroundColor: "#8e2de2",
      width: "60%",
      fontWeight: 700,
    },
    "& .MuiButtonBase-root:hover": {
      backgroundColor: "#531b83",
    },
  },
  textField: {
    display: "flex",
    borderRadius: "4px",
    bgcolor: "#3596ff",
    "& input": {
      color: "white",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiInputLabel-root": {
      color: "#fffffff2",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "#ffffffb3",
    },
    "& input::-webkit-search-cancel-button": {
      visibility: "hidden",
    },
  },
}
