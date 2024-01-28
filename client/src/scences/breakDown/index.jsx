import { Box } from "@mui/material";
import BreackDownChart from "../../components/BreakDownChart";
import Header from "../../components/Header";

const BreckDown = () => {
  return (
    <Box margin={"1.5rem 2.5rem"}>
      <Header title={"BREAKDOWN"} subTitle={"Breckdown of sales by category"} />
      <Box mt={"24px"} height={"75vh"}>
        <BreackDownChart />
      </Box>
    </Box>
  );
};
export default BreckDown;
