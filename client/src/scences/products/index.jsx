import { ExpandMoreOutlined, MoreVertOutlined } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  Rating,
  Stack,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import Header from "../../components/Header";
import { useGetProductsQuery } from "../../state/api.js";

const Products = () => {
  const theme = useTheme();
  const colors = theme.palette;
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 762px)");
  console.log("data", data);

  // New Component
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  // Product Component
  const Product = ({
    _id,
    name,
    description,
    price,
    rating,
    category,
    supply,
    stat,
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
              <MoreVertOutlined />
            </IconButton>
          }
          title={name}
          subheader={category}
        />
        <CardMedia component="img" height="194" image="" alt="..." />
        <CardContent>
          <Typography variant="h6" color={colors.primary[100]}>
            {description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Stack>
            <Typography sx={{ mb: "1rem" }} color={colors.primary[100]}>
              ${Number(price).toFixed(2)}
            </Typography>
            <Rating value={rating} readOnly />
          </Stack>
          <ExpandMore
            expand={isExpanded}
            onClick={handleExpandClick}
            aria-expanded={isExpanded}
            aria-label="show more"
          >
            <ExpandMoreOutlined />
          </ExpandMore>
        </CardActions>
        <Collapse
          in={isExpanded}
          timeout={"auto"}
          unmountOnExit
          sx={{ color: colors.primary[200] }}
        >
          <CardContent>
            <Typography>id: {_id}</Typography>
            <Typography>Supply Left: {supply}</Typography>
            <Typography>
              Yearly Sale(This Year): {stat[0].yearlySalesTotal}
            </Typography>
            <Typography>
              Yearly Units Sold(This Year): {stat[0].yearlyTotalSoldUnits}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  };

  return (
    <Box margin={"12px 10px"}>
      <Header title="Products" subTitle="Products page" />
      {data || !isLoading ? (
        <Box
          mt={3}
          display={"grid"}
          gridTemplateColumns="repeat(3, minmax(0, 1fr))"
          justifyContent={"space-between"}
          rowGap={4}
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 3" },
          }}
        >
          {data.map(
            ({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
              stat,
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stat={stat}
              />
            )
          )}
        </Box>
      ) : (
        <Box>Loading...</Box>
      )}
    </Box>
  );
};
export default Products;
