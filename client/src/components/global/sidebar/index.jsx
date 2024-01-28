import {
  AdminPanelSettingsOutlined,
  CalendarMonthOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  Groups2,
  HomeOutlined,
  PieChartOutline,
  PointOfSaleOutlined,
  PublicOutlined,
  ReceiptLongOutlined,
  SettingsOutlined,
  ShoppingCartOutlined,
  TodayOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import profileImage from "../../../assets/profile.jpeg";
import FlexBetween from "../../FlexBetween";

// Nav Items List
const navItems = [
  { text: "Dashboard", icon: <HomeOutlined /> },
  { text: "Client Facing", icon: null },
  { text: "Products", icon: <ShoppingCartOutlined /> },
  { text: "Customers", icon: <Groups2 /> },
  { text: "Transactions", icon: <ReceiptLongOutlined /> },
  { text: "Geography", icon: <PublicOutlined /> },
  { text: "Sales", icon: null },
  { text: "Overview", icon: <PointOfSaleOutlined /> },
  { text: "Daily", icon: <TodayOutlined /> },
  { text: "Monthly", icon: <CalendarMonthOutlined /> },
  { text: "Breakdown", icon: <PieChartOutline /> },
  { text: "Management", icon: null },
  { text: "Admins", icon: <AdminPanelSettingsOutlined /> },
  { text: "Performance", icon: <TrendingUpOutlined /> },
];

const Sidebar = ({
  user,
  isNonMobile,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = theme.palette;

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav" width={isSidebarOpen ? drawerWidth : "0px"}>
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            "& .MuiDrawer-paper": {
              color: colors.primary[200],
              backgroundColor: colors.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box
            width="100%"
            sx={{
              "& .css-1msk61i-MuiButtonBase-root-MuiListItemButton-root:hover":
                {
                  backgroundColor: `${colors.secondary[600]} !important`,
                },
              "& .css-183fhep-MuiButtonBase-root-MuiListItemButton-root:hover":
                {
                  backgroundColor: `${colors.secondary[600]} !important`,
                },
              "& .css-16hwbyx-MuiButtonBase-root-MuiListItemButton-root:hover":
                {
                  backgroundColor: `${colors.secondary[600]} !important`,
                },
              "& .css-1o7cps4-MuiButtonBase-root-MuiListItemButton-root:hover":
                {
                  backgroundColor: `${colors.secondary[600]} !important`,
                },
              "& .css-exhh7z-MuiTypography-root": {
                fontSize: "0.8rem",
              },
            }}
          >
            <Box margin="1rem 2rem 1rem 3rem">
              <FlexBetween color={colors.secondary[200]}>
                <Box
                  width={"100%"}
                  display="flex"
                  alignItems="center"
                  gap="0.5rem"
                  justifyContent={"center"}
                >
                  <Typography
                    variant="h3"
                    textTransform="uppercase"
                    fontWeight="bold"
                    textAlign={"center"}
                  >
                    Ar Store
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography
                      key={text}
                      variant="h6"
                      sx={{
                        m: ".5rem 0 .15rem 3rem",
                        color: colors.primary[100],
                      }}
                    >
                      {text}
                    </Typography>
                  );
                }
                const linkText = text.toLowerCase();
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${linkText}`);
                        setActive(linkText);
                      }}
                      sx={{
                        backgroundColor:
                          active === linkText ? colors.secondary[600] : "",
                        padding: "4px !important",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === linkText
                              ? colors.primary[50]
                              : colors.primary[100],
                        }}
                        fontSize={"small"}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          ml: "-10px !important",
                          color: colors.primary[50],
                        }}
                        primary={text}
                      />
                      {active === linkText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Box position="absolute" bottom="1rem">
            <Divider />
            <FlexBetween
              textTransform="none"
              gap={"1rem"}
              m={"1rem 2rem 0 3rem"}
            >
              <Box
                component={"img"}
                alt="profile"
                src={profileImage}
                height={"40px"}
                width={"40px"}
                borderRadius={"50%"}
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign={"left"}>
                <Typography
                  fontWeight={"bold"}
                  fontSize={"0.9rem"}
                  sx={{ color: colors.primary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize={"0.8rem"}
                  sx={{ color: colors.primary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{ color: colors.primary[300], fontSize: "25px" }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};
export default Sidebar;
