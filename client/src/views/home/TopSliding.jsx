import { Box, Typography } from "@mui/material";
import MainCarousel from "./carousel/MainCarousel";

const TopSliding = ({ colors, isNonMobile = true }) => {
  //   const isNonMobile = true;

  return (
    <Box
      display={"grid"}
      gridTemplateColumns={"repeat(12, 1fr)"}
      gridAutoRows={"60px"}
      gap={1}
      mb={3}
      sx={{
        "& > div": { gridColumn: isNonMobile ? undefined : "span 12" },
      }}
    >
      <Box
        gridColumn={"span 4"}
        gridRow={"span 5"}
        p={"1rem"}
        sx={{
          backgroundColor: colors.background.alt,
        }}
      >
        <Typography>hi</Typography>
      </Box>
      <Box
        gridColumn={"span 8"}
        gridRow={"span 5"}
        sx={{
          backgroundColor: colors.background.alt,
          overflow: "hidden",
          zIndex: 1200,
          objectFit: "fill",
        }}
      >
        <MainCarousel infinite={false} />
      </Box>
      <Box
        gridColumn={"span 6"}
        gridRow={"span 2"}
        pl={1.5}
        mr={"-15px"}
        sx={{
          backgroundColor: colors.background.default,
          overflow: "hidden",
          zIndex: 1200,
          objectFit: "fill",
          clipPath: "polygon(15% 100%, 0% 0%, 95% 0%, 100% 100%)",
        }}
      >
        <MainCarousel type={"fadeout"} infinite={false} />
      </Box>
      <Box
        gridColumn={"span 6"}
        gridRow={"span 2"}
        pr={1.5}
        ml={"-15px"}
        sx={{
          backgroundColor: colors.background.default,
          overflow: "hidden",
          zIndex: 1200,
          objectFit: "fill",
          clipPath: "polygon(5% 100%, 0% 0%, 85% 0%, 100% 100%)",
        }}
      >
        <MainCarousel type={"fadeout"} duration={1000} infinite={false} />
      </Box>
    </Box>
  );
};
export default TopSliding;
