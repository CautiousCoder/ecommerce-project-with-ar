import { Box, Stack, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import ProductView from "components/ProductView";
import RecommandedView from "components/RecommandedView";
import Navbar from "../navbar";

const isNonMobile = true;

const index = () => {
  const theme = useTheme();
  const colors = theme.palette;
  return (
    <Box margin={"0 3.5%"}>
      <Navbar />
      <FlexBetween>
        <Box width={"20%"}></Box>
        <Box width={"80%"}>
          <Stack>
            <FlexBetween>
              <Box>
                <Typography variant="h6">
                  # items found for "Category"
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6">Sort By</Typography>
              </Box>
            </FlexBetween>
            <Box
              mt={3}
              display={"grid"}
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              justifyContent={"space-between"}
              rowGap={4}
              columnGap="1.15%"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 3" },
              }}
            >
              <ProductView colors={colors} />
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
export default index;
