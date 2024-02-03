import { Box, Typography, useTheme } from "@mui/material";
import ProductView from "../../components/ProductView";
import CategoryView from "./CategoryView";
import TopSliding from "./TopSliding";
import LeftingCarousel from "./carousel/LeftingCarousel";

// media query
// const isNonMobile = useMediaQuery("(min-width:992px)");

const Home = () => {
  const theme = useTheme();
  const colors = theme.palette;

  return (
    <Box margin={"0px 3.5%"}>
      <TopSliding colors={colors} />
      <Typography variant="h3" textTransform={"uppercase"}>
        Top sale
      </Typography>
      <Box>
        <LeftingCarousel colors={colors} />
      </Box>
      <Typography variant="h3" textTransform={"uppercase"}>
        Category
      </Typography>
      <Box>
        <CategoryView />
      </Box>
      <Typography variant="h3" textTransform={"uppercase"}>
        Just For You
      </Typography>
      <Box>
        <ProductView colors={colors} />
      </Box>
    </Box>
  );
};
export default Home;
