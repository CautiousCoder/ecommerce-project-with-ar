import { Box } from "@mui/material";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import ProductView from "./ProductView";

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
const RecommandedView = ({ data = defaultData, colors = null }) => {
  const items = data.map((item) => (
    <Box>
      <ProductView name={item.name} colors={colors} />
    </Box>
  ));
  return (
    <AliceCarousel
      items={items}
      disableDotsControls
      responsive={responsive}
      paddingRight={50}
      paddingLeft={50}
    />
  );
};
export default RecommandedView;
