import { Stack, Typography, useTheme } from "@mui/material";

const Header = ({ title, subTitle }) => {
  const theme = useTheme();
  const colors = theme.palette;
  return (
    <Stack ml={1}>
      <Typography variant="h3" color={colors.primary[50]}>
        {title}
      </Typography>
      <Typography variant="h6" color={colors.primary[100]} fontSize={"12px"}>
        {subTitle}
      </Typography>
    </Stack>
  );
};
export default Header;
