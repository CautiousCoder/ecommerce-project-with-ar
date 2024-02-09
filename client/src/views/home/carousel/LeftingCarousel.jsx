import { Box, Button, Stack, Typography } from "@mui/material";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from "react-router-dom";
import FlexBetween from "../../../components/FlexBetween";

const responsive = {
  0: { items: 1 },
  992: { items: 2 },
  1024: { items: 3 },
  1200: { items: 5 },
};
const LeftingCarousel = ({
  data,
  duration = 5000,
  infinite = false,
  colors,
}) => {
  const items = data?.map((item) => (
    <Stack height={"320px"} width={"200px"}>
      <Box width={"100%"} height={"150px"}>
        <img
          src={`http://localhost:5000/post/${item.img}`}
          alt="Products"
          height={"150px !important"}
          width={"100%"}
          style={{
            height: "150px",
          }}
        />
      </Box>
      <Typography mt={2} variant="h5" color={colors.primary[100]}>
        {item.name}
      </Typography>
      <FlexBetween>
        <Typography mt={2} variant="h6" color={colors.primary[100]}>
          ${item.price}
        </Typography>
        <Link to={`/frontend/product/${item._id}`}>
          <Button
            sx={{
              padding: "10px 20px",
              pt: "10px",
              borderRadius: "10px",
              color: colors.primary[100],
              backgroundColor: colors.background.alt,
            }}
          >
            Buy Now
          </Button>
        </Link>
      </FlexBetween>
    </Stack>
  ));
  return (
    <AliceCarousel
      items={items}
      disableDotsControls
      autoPlayInterval={duration}
      infinite={infinite}
      responsive={responsive}
      paddingRight={50}
    />
  );
};
export default LeftingCarousel;
