import { Dialog } from "@/app/types/users"
import { selectAllDialogs, setCurrentDialog } from "@/store/messageSlice"
import {
  Box,
  List,
  Divider,
  ListItemButton,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from "@mui/material"
import { useDispatch, useSelector } from "react-redux"

const DialogsList = () => {
  const dialogs = useSelector(selectAllDialogs)
  const dispatch = useDispatch()
  const handleClick = (id: number) => {
    const current = dialogs.find((el, i) => {
      if (el.id === id) return el
    })
    if (current) dispatch(setCurrentDialog(current))
  }
  return (
    <Box sx={{ height: "70%" }}>
      <Box sx={styles.dialogListContainer}>
        <nav aria-label="main mailbox folders">
          <List sx={{ color: "white" }}>
            {dialogs.map((el: Dialog) => (
              <div key={el.id}>
                <ListItemButton
                  onClick={() => {
                    handleClick(el.id)
                  }}>
                  <ListItem sx={{ pl: "1rem" }} disablePadding>
                    <ListItemAvatar>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      secondaryTypographyProps={{
                        sx: { color: "whitesmoke" },
                      }}
                      primary={el.name}
                      secondary={
                        <>
                          <Typography
                            fontWeight={"600"}
                            sx={{ display: "inline", color: "whitesmoke" }}
                            component="span"
                            variant="body2"
                            color="text.primary">
                            Последнее сообщение
                          </Typography>
                          {}
                        </>
                      }
                    />
                  </ListItem>
                </ListItemButton>
              </div>
            ))}
          </List>
        </nav>
      </Box>
    </Box>
  )
}
const styles = {
  dialogListContainer: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
    width: "100%",
    maxWidth: 360,
    overflow: "scroll",
    height: "110%",
  },
}
export default DialogsList
