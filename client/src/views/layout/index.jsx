import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../../views/navbar";

const FrontLayout = () => {
  return (
    <Box>
      <Stack>
        <Navbar />
        <Outlet />
      </Stack>
    </Box>
  );
};
export default FrontLayout;
