// Product Component
import { FavoriteBorderOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import FlexBetween from "./FlexBetween";

const ProductView = ({ data, colors, isNonMobile }) => {
  // const [isExpanded, setIsExpanded] = useState(false);
  // const handleExpandClick = () => {
  //   setIsExpanded(!isExpanded);
  // };

  return (
    <Box
      mt={3}
      display={"grid"}
      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
      justifyContent={"space-between"}
      rowGap={4}
      columnGap="1.33%"
      sx={{
        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
      }}
    >
      {data?.map(({ _id, name, price, img, rating, category }) => (
        <Card
          key={_id}
          sx={{
            backgroundImage: "none",
            backgroundColor: colors.background.alt,
            borderRadius: "0.55rem",
          }}
        >
          <CardHeader
            action={
              <IconButton aria-label="settings">
                <FavoriteBorderOutlined />
              </IconButton>
            }
            title={name}
            subheader={category}
          />
          <CardMedia
            component="img"
            height="194"
            image={`http://localhost:5000/post/${img}`}
            alt="..."
            sx={{ height: "180px" }}
          />

          <CardActions disableSpacing>
            <FlexBetween width={"100%"}>
              <Stack>
                <Typography sx={{ mb: "1rem" }} color={colors.primary[100]}>
                  ${Number(price).toFixed(2)}
                </Typography>
                <Rating value={rating} readOnly />
              </Stack>
              <Link to={`/frontend/product/${_id}`}>
                <Button
                  sx={{
                    padding: "10px 20px",
                    backgroundColor: colors.background.default,
                    color: colors.primary[100],
                    pt: "15px",
                  }}
                >
                  Buy Now
                </Button>
              </Link>
            </FlexBetween>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default ProductView;
