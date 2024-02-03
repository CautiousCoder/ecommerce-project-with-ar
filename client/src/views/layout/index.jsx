import { Box, Stack } from "@mui/material";
import Home from "../../views/home";
import Navbar from "../../views/navbar";

const FrontLayout = () => {
  return (
    <Box>
      <Stack>
        <Navbar />
        <Home />
      </Stack>
    </Box>
  );
};
export default FrontLayout;
