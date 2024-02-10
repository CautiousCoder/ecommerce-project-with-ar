import { ViewInAr } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Divider,
  Rating,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link, useParams } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import { useGetProductQuery } from "../../state/api";
import SimpleDialog from "./SimpleDialog";

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  768: { items: 3 },
  1024: { items: 8 },
};
const responsive1 = {
  0: { items: 1 },
  568: { items: 2 },
  768: { items: 3 },
  1024: { items: 4 },
};

// SimpleDialog.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
//   selectedValue: PropTypes.string.isRequired,
// };

const Product = () => {
  const theme = useTheme();
  const colors = theme.palette;
  const isNonMobile = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState(false);

  // get id from query string
  const { id } = useParams();
  //   console.log("Product id -> ", id);
  const { data, isLoading } = useGetProductQuery(id);

  //   console.log("product data", data);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const items = data?.simillarProducts.map((item) => (
    <Card
      key={item._id}
      sx={{ maxWidth: "240px", backgroundColor: colors.background.alt }}
    >
      <Link to={`/frontend/product/${item._id}`}>
        <img
          src={`http://localhost:5000/post/${item.img}`}
          alt="Products"
          style={{
            height: "150px",
            width: "100%",
          }}
        />
        <Typography p={2} variant="h6">
          Product Name
        </Typography>
      </Link>
    </Card>
  ));
  const items1 = data?.simillarProducts.map((item) => (
    <Card
      key={`key_${item._id}`}
      sx={{
        margin: "0 10px",
        maxWidth: "280px",
        backgroundColor: colors.background.alt,
      }}
    >
      <img
        src={`http://localhost:5000/post/${item.img}`}
        alt="Products"
        style={{
          height: "150px",
          width: "100%",
        }}
      />
      <Box p={1.5}>
        <Typography mt={2} variant="span" color={colors.secondary[200]}>
          {item.name}
        </Typography>
        <FlexBetween mt={2}>
          <Stack>
            <Typography variant="h4">{item.price}</Typography>
            <Rating name="read-only" value={"4.6"} readOnly />
          </Stack>
          <Link to={`/frontend/product/${item._id}`}>
            <Button
              sx={{
                padding: "10px 20px",
                backgroundColor: colors.background.alt,
              }}
            >
              Buy Now
            </Button>
          </Link>
        </FlexBetween>
      </Box>
    </Card>
  ));

  return (
    <Stack margin={"10px 4.5%"}>
      <Box mt={3} mb={3}>
        <Typography
          marginLeft={"4.5%"}
          marginBottom={"10px"}
          variant="h2"
          color={colors.primary[50]}
        >
          Similar Products
        </Typography>
        <AliceCarousel
          items={items}
          disableDotsControls
          disableButtonsControls
          infinite={false}
          responsive={responsive}
          paddingRight={50}
          paddingLeft={50}
        />
      </Box>
      <Divider />
      <Box
        m={"12px 0"}
        display={"grid"}
        gridTemplateColumns="repeat(2, minmax(0, 1fr))"
        justifyContent={"space-between"}
        rowGap={4}
        columnGap="1.33%"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
          "& .viewar > button:hover": {
            backgroundColor: `${colors.background.frontDark} !important`,
          },
        }}
      >
        <Box
          p={"30px 30px 0 30px"}
          sx={{
            backgroundColor: colors.background.frontLight,
            borderRadius: "6px",
          }}
        >
          <img
            src={`http://localhost:5000/post/${data?.product[0].img}`}
            alt="Products"
            style={{
              maxWidth: "490px",
              height: "360px",
              alignContent: "center",
            }}
          />
          <Box
            mt={3}
            mb={2}
            display={"flex"}
            justifyContent={"center"}
            className="viewar"
          >
            <Button
              onClick={handleClickOpen}
              className="arbutton"
              sx={{
                padding: "20px",
                borderRadius: "50%",
                backgroundColor: colors.background.alt,
              }}
            >
              <ViewInAr />
            </Button>
            <SimpleDialog id={id} open={open} onClose={handleClose} />
          </Box>
        </Box>
        <Card sx={{ padding: "12px", backgroundColor: colors.background.alt }}>
          <Stack rowGap={2}>
            <Typography variant="h3">{data?.product[0].name}</Typography>
            <Box display={"flex"} flexDirection={"row"} mt={2} columnGap={2}>
              <Rating name="read-only" value={"4.2"} readOnly />
              <Typography variant="span" color={colors.secondary[300]}>
                542 Rating's
              </Typography>
              <Typography variant="span" color={colors.primary[200]}>
                3421 Views
              </Typography>
            </Box>
            <Typography mb={2} variant="h3" color={colors.redAccent[600]}>
              ${data?.product[0].price}
            </Typography>
          </Stack>
          <Divider />
          {/* <Box>
            <h3 className="text-sm font-medium text-gray-900">Color</h3>
            <RadioGroup
              value={selectedColor}
              onChange={setSelectedColor}
              className="mt-4"
            >
              <RadioGroup.Label className="sr-only">
                Choose a color
              </RadioGroup.Label>
              <div className="flex items-center space-x-3">
                {product.colors.map((color) => (
                <RadioGroup.Option
                  key={color.name}
                  value={color}
                  className={({ active, checked }) =>
                    classNames(
                      color.selectedClass,
                      active && checked ? "ring ring-offset-1" : "",
                      !active && checked ? "ring-2" : "",
                      "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                    )
                  }
                >
                  <RadioGroup.Label as="span" className="sr-only">
                    {color.name}
                  </RadioGroup.Label>
                  <span
                    aria-hidden="true"
                    className={classNames(
                      color.class,
                      "h-8 w-8 rounded-full border border-black border-opacity-10"
                    )}
                  />
                </RadioGroup.Option>
                ))} 
              </div>
            </RadioGroup>
          </Box>
          <Box mt={2}>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <a
                href="#"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Size guide
              </a>
            </div>

            <RadioGroup
              value={selectedSize}
              onChange={setSelectedSize}
              className="mt-4"
            >
              <RadioGroup.Label className="sr-only">
                Choose a size
              </RadioGroup.Label>
              <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                {product.sizes.map((size) => (
                  <RadioGroup.Option
                    key={size.name}
                    value={size}
                    disabled={!size.inStock}
                    className={({ active }) =>
                      classNames(
                        size.inStock
                          ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                          : "cursor-not-allowed bg-gray-50 text-gray-200",
                        active ? "ring-2 ring-indigo-500" : "",
                        "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                      )
                    }
                  >
                    {({ active, checked }) => (
                      <>
                        <RadioGroup.Label as="span">
                          {size.name}
                        </RadioGroup.Label>
                        {size.inStock ? (
                          <span
                            className={classNames(
                              active ? "border" : "border-2",
                              checked
                                ? "border-indigo-500"
                                : "border-transparent",
                              "pointer-events-none absolute -inset-px rounded-md"
                            )}
                            aria-hidden="true"
                          />
                        ) : (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                          >
                            <svg
                              className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                              viewBox="0 0 100 100"
                              preserveAspectRatio="none"
                              stroke="currentColor"
                            >
                              <line
                                x1={0}
                                y1={100}
                                x2={100}
                                y2={0}
                                vectorEffect="non-scaling-stroke"
                              />
                            </svg>
                          </span>
                        )}
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </Box> */}
          <Box
            display={"grid"}
            gridTemplateColumns={"repeat(12, 1fr)"}
            rowGap={3}
            columnGap={2}
          >
            <Box mt={1} gridColumn={"span 4"}>
              Brand
            </Box>
            <Box mt={1} gridColumn={"span 8"}>
              New Brand
            </Box>
            <Divider sx={{ gridColumn: "span 12" }} />
            <Box gridColumn={"span 4"}>Model Name</Box>
            <Box gridColumn={"span 8"}>Model****</Box>
            <Divider sx={{ gridColumn: "span 12" }} />
          </Box>
          <Typography mt={5} variant="h3">
            Product Details
          </Typography>
          <Box mt={3} ml={2}>
            {data?.product[0].shortDes}
          </Box>
        </Card>
      </Box>
      <Divider />
      <Box mt={5}>
        <Typography
          marginLeft={"4.5%"}
          marginBottom={"10px"}
          variant="h2"
          color={colors.primary[50]}
        >
          Recommanded For You
        </Typography>

        <AliceCarousel
          items={items1}
          disableDotsControls
          disableButtonsControls
          responsive={responsive1}
          paddingRight={50}
          paddingLeft={50}
        />
      </Box>
    </Stack>
  );
};
export default Product;
