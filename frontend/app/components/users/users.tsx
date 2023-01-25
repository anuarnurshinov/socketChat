import { Box, IconButton, Typography } from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded"
import SupervisorAccountRoundedIcon from "@mui/icons-material/SupervisorAccountRounded"
import ImportContactsRoundedIcon from "@mui/icons-material/ImportContactsRounded"
import BackpackRoundedIcon from "@mui/icons-material/BackpackRounded"
import SearchField from "./components/searchField"
import NewChatBtnContainer from "./components/newChatBtn/container"
import DialogsList from "./components/dialogLists/dialogsList"
import DialogsListContainer from "./components/dialogLists/container"

type UsersProps = {
  setIsSearch: (status: boolean) => void
}

const Users: React.FC<UsersProps> = ({ setIsSearch }) => {
  return (
    <Box sx={styles.userContainer}>
      <TitleAndIcons />
      <SearchField setIsSearch={setIsSearch} />
      <DialogsListContainer />
    </Box>
  )
}

export default Users

//Внутренние компоненты

const TitleAndIcons = () => {
  return (
    <Box
      sx={{
        height: "10%",
        display: "flex",
      }}>
      <Box flexGrow={1} position={"relative"}>
        <Typography
          sx={{
            transform: "translate(5%,0)",
            ml: 1,
            p: "1.4rem 1.7rem",
          }}
          className="verticalCenter"
          letterSpacing={"-0.7px"}
          fontWeight={700}
          color={"white"}
          fontSize={"2rem"}>
          WEHELP
        </Typography>
      </Box>
      <NewChatBtnContainer />
      <Box position={"relative"}>
        <IconButton size="large" className="verticalCenter">
          <MoreVertIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>
    </Box>
  )
}

const styles = {
  userContainer: {
    // boxShadow: "14px 8px 41px 4px rgba(46, 64, 77, 0.6)",
    zIndex: 1,
    width: "30%",
    borderRadius: "10px",
    backgroundImage: "linear-gradient(190deg, #007afd 0%, #0079ff 100%)",
    transform: "translate(1%,0) scale(1.015)",
    display: {
      md: "block",
      sm: "none",
      xs: "none",
    },
  },
}
