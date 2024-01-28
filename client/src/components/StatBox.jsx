import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";

const StatBox = ({ title, value, increase, icon, descriptions }) => {
  const theme = useTheme();
  return (
    <Box
      gridColumn={"span 2"}
      gridRow={"span 2"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      p={"1rem .6rem"}
      flex={"1 1 100%"}
      sx={{
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <FlexBetween>
        <Typography
          variant="h6"
          sx={{ color: theme.palette.secondary[100], fontSize: "12px" }}
        >
          {title}
        </Typography>
        {icon}
      </FlexBetween>
      <Typography
        variant="h4"
        fontWeight={"700"}
        sx={{
          color: theme.palette.secondary[200],
        }}
      >
        {value}
      </Typography>
      <FlexBetween gap={"0.25rem"}>
        <Typography
          variant="h6"
          fontStyle={"italic"}
          sx={{ color: theme.palette.secondary.light }}
        >
          {increase}
        </Typography>
        <Typography color={theme.palette.primary[200]} fontSize={"12px"}>
          {descriptions}
        </Typography>
      </FlexBetween>
    </Box>
  );
};
export default StatBox;
