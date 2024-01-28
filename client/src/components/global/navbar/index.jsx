import {
  DarkModeOutlined,
  ExpandMoreRounded,
  LightModeOutlined,
  MenuOutlined,
  NotificationsNoneOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { useState } from "react";
import { useDispatch } from "react-redux";
import profileImage from "../../../assets/profile.jpeg";
import { setMode } from "../../../state";
import FlexBetween from "../../FlexBetween";

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const theme = useTheme();
  const colors = theme.palette;
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setDdMenu(null);

  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      justifyContent="space-between"
      p={"0px 16px !important"}
      backgroundColor={colors.background.default}
    >
      <Box display="flex">
        <IconButton
          sx={{ marginRight: "20px", p: 1.5 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <MenuOutlined />
        </IconButton>
        {/* For Search Bar */}
        <Box
          display={"flex"}
          flexDirection={"row"}
          borderRadius="3px"
          backgroundColor={colors.background.alt}
          margin={"8px 0"}
        >
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
          <IconButton type="button">
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>
      {/* For Right Icons */}

      <Box display={"flex"} flexDirection={"row"} p={1}>
        <IconButton sx={{ p: 1 }} onClick={() => dispatch(setMode())}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlined />
          ) : (
            <LightModeOutlined />
          )}
        </IconButton>
        <IconButton sx={{ p: 1 }}>
          <NotificationsNoneOutlined />
        </IconButton>
        <IconButton sx={{ p: 1 }}>
          <SettingsOutlined />
        </IconButton>

        {/* <Box
          display={"flex"}
          sx={{
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.15)" },
            borderRadius: 2,
            cursor: "pointer",
          }}
        >
          <IconButton sx={{ p: 1 }}>
            <PersonOffOutlined />
          </IconButton>
          <Typography
            variant="h6"
            minWidth={"60px"}
            sx={{ fontSize: "11px !important", marginTop: "12px" }}
          >
            User Name
          </Typography>
          <IconButton sx={{ marginLeft: "-8px !important" }}>
            <ExpandMoreRounded />
          </IconButton>
        </Box> */}
        <Box>
          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
              gap={"1rem"}
              m={"1.5rem 2rem 0 3rem"}
            >
              <Box
                component={"img"}
                alt="profile"
                src={profileImage}
                height={"32px"}
                width={"32px"}
                borderRadius={"50%"}
                sx={{ objectFit: "cover" }}
              />
              <Box
                display={"flex"}
                flexDirection={"column"}
                textAlign={"left"}
                textTransform="none"
                pl={"7px"}
              >
                <Typography
                  fontWeight={"bold"}
                  fontSize={"0.75rem"}
                  sx={{ color: colors.primary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize={"0.6rem"}
                  sx={{ color: colors.primary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <ExpandMoreRounded
                sx={{ color: colors.primary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </Box>
      </Box>
    </Box>
  );
};
export default Navbar;
