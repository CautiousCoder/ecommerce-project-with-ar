import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import Header from "../../components/Header";
import OverviewChart from "../../components/OverviewChart";

const Overview = () => {
  const theme = useTheme();
  const colors = theme.palette;
  const [view, setView] = useState("units");

  return (
    <Box margin={"12px 20px"}>
      <Header
        title={"OVERVIEW"}
        subTitle={"Overveiw of general revenue and profit"}
      />
      <Box height={"68vh"} width={"100%"}>
        <FormControl sx={{ mt: "1rem", width: "20%" }}>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="units">Units</MenuItem>
          </Select>
        </FormControl>
        <OverviewChart view={view} />
      </Box>
    </Box>
  );
};
export default Overview;
