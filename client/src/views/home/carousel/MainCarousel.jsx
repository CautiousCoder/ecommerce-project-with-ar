import { Box, Button, Typography } from "@mui/material";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from "react-router-dom";

const MainCarousel = ({
  data,
  type = null,
  duration = 5000,
  infinite = true,
  colors,
}) => {
  const items = data?.map((item) => (
    <Box
      key={item._id}
      sx={{
        width: "100%",
        height: "100% !important",
        backgroundImage: `url(http://localhost:5000/category/${item.image})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "fit",
        position: "relative",
        "& .alice-carousel__wrapper": { height: "100%" },
      }}
    >
      <Box position={"absolute"} bottom={"50px"} left={"40px"}>
        <Typography
          variant="h2"
          color={colors.primary[900]}
          sx={{
            backgroundColor: colors.background[300],
            m: "10px",
            p: "5px 10px",
            borderRadius: "10px",
          }}
        >
          {item.name}
        </Typography>
        <Link>
          <Button
            sx={{
              padding: "15px 35px",
              borderRadius: "12px",
              ml: "10px",
              backgroundColor: colors.background.alt,
              color: colors.primary[100],
            }}
          >
            Shop Now
          </Button>
        </Link>
      </Box>
    </Box>
  ));
  return (
    <AliceCarousel
      items={items}
      animationType={type}
      disableButtonsControls
      disableDotsControls
      autoPlay
      autoPlayInterval={duration}
      infinite={infinite}
    />
  );
};
export default MainCarousel;
