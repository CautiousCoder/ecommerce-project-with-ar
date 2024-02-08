import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import ProductView from "../../components/ProductView";
import RecommandedView from "../../components/RecommandedView";
import { useGetAllPostByCategoryQuery } from "../../state/api";

const CategoryProduct = () => {
  const theme = useTheme();
  const colors = theme.palette;

  // get query string
  const { id } = useParams();
  // console.log("id", id)
  // get data
  const { data, isLoading } = useGetAllPostByCategoryQuery(id);
  // console.log("Category data", data);

  // media query
  const isNonMobile = useMediaQuery("(min-width: 992px)");

  return (
    <Box margin={"0 3.5%"}>
      <FlexBetween mt={3}>
        <Box width={"20%"}></Box>
        <Box width={"80%"}>
          <Stack width={"100%"}>
            <FlexBetween>
              <Box>
                <Typography variant="h6">
                  {`${data?.length} items found for "Category"`}
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6">Sort By</Typography>
              </Box>
            </FlexBetween>
            <Box>
              {data && !isLoading ? (
                <ProductView
                  isNonMobile={isNonMobile}
                  data={data}
                  colors={colors}
                />
              ) : (
                "Loading..."
              )}
            </Box>
            <Typography variant="h3" textTransform={"capitalize"}>
              Recommanded for you
            </Typography>
            <Box>
              <RecommandedView colors={colors} />
            </Box>
          </Stack>
        </Box>
      </FlexBetween>
    </Box>
  );
};
export default CategoryProduct;
