// Product Component
import { FavoriteBorderOutlined } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

const ProductView = ({
  _id,
  name = "Product Name",
  price = "20",
  img = null,
  rating = 4,
  category = "shoe",
  colors = null,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card
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
      <CardMedia component="img" height="194" image={img} alt="..." />

      <CardActions disableSpacing>
        <Stack>
          <Typography sx={{ mb: "1rem" }} color={colors.primary[100]}>
            ${Number(price).toFixed(2)}
          </Typography>
          <Rating value={rating} readOnly />
        </Stack>
      </CardActions>
    </Card>
  );
};

export default ProductView;
