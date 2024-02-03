import { Box, Typography } from "@mui/material";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const defaultData = [
  { name: "Product" },
  { name: "Product1" },
  { name: "Product2" },
  { name: "Product3" },
  { name: "Product4" },
  { name: "Product5" },
  { name: "Product" },
  { name: "Product1" },
  { name: "Product2" },
  { name: "Product3" },
  { name: "Product4" },
  { name: "Product5" },
];

const responsive = {
  0: { items: 1 },
  992: { items: 2 },
  1024: { items: 3 },
  1200: { items: 5 },
};
const LeftingCarousel = ({
  data = defaultData,
  duration = 5000,
  infinite = false,
  colors = null,
}) => {
  const items = data.map((item) => (
    <Box>
      <Box
        m={0.5}
        p={1}
        sx={{
          backgroundColor: colors.background.alt,
        }}
      >
        <Typography variant="h6">{item.name}</Typography>
      </Box>
    </Box>
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
