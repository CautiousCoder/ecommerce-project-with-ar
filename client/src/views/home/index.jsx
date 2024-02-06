import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import ProductView from "../../components/ProductView";
import { useGetHomeDataQuery } from "../../state/api";
import CategoryView from "./CategoryView";
import TopSliding from "./TopSliding";
import LeftingCarousel from "./carousel/LeftingCarousel";

// media query
// const isNonMobile = useMediaQuery("(min-width:992px)");

const Home = () => {
  const theme = useTheme();
  const colors = theme.palette;

  const isNonMobile = useMediaQuery("(min-width: 762px)");

  // data
  const { data, isLoading } = useGetHomeDataQuery();
  // console.log("object", data);

  return (
    <Box margin={"0px 3.5%"}>
      <TopSliding data={data ? data.category : undefined} colors={colors} />
      <Typography variant="h3" textTransform={"uppercase"}>
        Top sale
      </Typography>
      <Box>
        <LeftingCarousel
          data={data ? data.products : undefined}
          colors={colors}
        />
      </Box>
      <Typography variant="h3" textTransform={"uppercase"}>
        Category
      </Typography>
      <Box>
        <CategoryView data={data ? data.category : undefined} colors={colors} />
      </Box>
      <Typography variant="h3" textTransform={"uppercase"}>
        Just For You
      </Typography>
      <Box>
        <ProductView
          data={data ? data.products : undefined}
          colors={colors}
          isNonMobile={isNonMobile}
        />
      </Box>
    </Box>
  );
};
export default Home;
