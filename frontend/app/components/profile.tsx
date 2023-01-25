import { Box, Typography, ButtonBase, Badge, Theme, Grow } from "@mui/material"
import MyLocationIcon from "@mui/icons-material/MyLocation"
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone"
import EmailIcon from "@mui/icons-material/Email"
import { styled } from "@mui/material/styles"
import Link from "next/link"

type ProfileProps = {
  isSearch: boolean
}
const Profile: React.FC<ProfileProps> = ({ isSearch }) => {
  return (
    <Box
      sx={{
        display: isSearch ? "none" : "",
        zIndex: 1,
        borderRadius: "5px 10px 10px 5px",
        bgcolor: "white",
        width: "25%",
        transform: "scale(1.005)",
      }}>
      <Grow in={!isSearch}>
        <Box sx={{ width: "100%", height: "100%" }}>
          <Avatar />
          <UserInformation />
        </Box>
      </Grow>
    </Box>
  )
}

const Avatar = () => {
  //Вспомогательные компоненты для аватара
  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: "relative",
    borderRadius: "50%",
    overflow: "hidden",
    height: "12rem",
    width: "12rem",
    [theme.breakpoints.down("sm")]: {},
    "&:hover, &.Mui-focusVisible": {
      zIndex: 1,
      "& .MuiImageBackdrop-root": {
        opacity: 0.3,
      },
    },
  }))

  const ImageSrc = styled("span")({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  })

  const ImageBackdrop = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0,
    transition: theme.transitions.create("opacity"),
  }))

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }))

  return (
    <Box
      height={"40%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot">
        <ImageButton focusRipple key={"Inna Ivanova"}>
          <ImageSrc
            style={{
              backgroundImage: `url(${"https://img.freepik.com/free-photo/beautiful-girl-stands-near-walll-with-leaves_8353-5377.jpg?w=740&t=st=1673776784~exp=1673777384~hmac=1dfe58c2a36ce157bc76af1c83bb28dc801a41602dec7e4ac5970cbaf3d68d10"})`,
            }}
          />
          <ImageBackdrop className="MuiImageBackdrop-root" />
        </ImageButton>
      </StyledBadge>
    </Box>
  )
}

const UserInformation = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "1rem",
        flexDirection: "column",
        alignItems: "center",
        "&>div": {
          display: "flex",
          flexDirection: "row",
          justifyContent: "left",
        },
      }}>
      <Box sx={{ textAlign: "center", color: "gray" }}>
        <MyLocationIcon /> <Typography> &nbsp; Манчестер, Лондон</Typography>
      </Box>
      <Box sx={{ textAlign: "center", color: "gray" }}>
        <PhoneIphoneIcon /> <Typography> &nbsp; 8 999 777 36 36</Typography>
      </Box>
      <Box sx={{ textAlign: "center", color: "gray" }}>
        <EmailIcon /> <Typography> &nbsp; abobabaloba@mail.com</Typography>
      </Box>
    </Box>
  )
}

export default Profile
