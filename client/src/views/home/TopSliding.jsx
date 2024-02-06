import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import MainCarousel from "./carousel/MainCarousel";

const TopSliding = ({ data, colors, isNonMobile = true }) => {
  //   const isNonMobile = true;
  // console.log("data", data);

  return (
    <Box
      display={"grid"}
      gridTemplateColumns={"repeat(12, 1fr)"}
      gridAutoRows={"60px"}
      gap={1}
      mb={3}
      sx={{
        "& > div": { gridColumn: isNonMobile ? undefined : "span 12" },
      }}
    >
      <Box
        gridColumn={"span 4"}
        gridRow={"span 5"}
        p={"1rem"}
        sx={{
          backgroundColor: colors.background.alt,
        }}
      >
        <nav>
          <List
            sx={{
              "& .css-122l0rq-MuiButtonBase-root-MuiListItemButton-root": {
                p: "2px 10px",
              },
            }}
          >
            {data?.map((item) => (
              <ListItem key={item._id} disablePadding>
                <ListItemButton>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </nav>
      </Box>
      <Box
        gridColumn={"span 8"}
        gridRow={"span 5"}
        sx={{
          backgroundColor: colors.background.alt,
          overflow: "hidden",
          zIndex: 1200,
          objectFit: "fill",
          height: "100%",
          "& .MuiBox-root css-19mzxgl": { height: "100% !important" },
          "& .alice-carousel": { height: "100% !important" },
          "& .alice-carousel > div": { height: "100% !important" },
          "& .alice-carousel__wrapper": { height: "100% !important" },
        }}
      >
        <MainCarousel data={data} colors={colors} />
      </Box>
      <Box
        gridColumn={"span 6"}
        gridRow={"span 2"}
        pl={1.5}
        mr={"-15px"}
        sx={{
          backgroundColor: colors.background.default,
          overflow: "hidden",
          zIndex: 1200,
          objectFit: "fill",
          clipPath: "polygon(15% 100%, 0% 0%, 95% 0%, 100% 100%)",
        }}
      >
        <FlexBetween
          sx={{
            height: "100%",
            backgroundColor: colors.background.alt,
          }}
        >
          <Stack p={3} ml={10}>
            <Typography variant="h4" color={colors.primary[100]}>
              {data ? data[3].name : ""}
            </Typography>
            <Link>
              <Button
                type="button"
                sx={{
                  mt: "10px",
                  padding: "12px 25px",
                  borderRadius: "8px",
                  backgroundColor: colors.background.default,
                  color: colors.primary[100],
                }}
              >
                Shop Now
              </Button>
            </Link>
          </Stack>
          <Box
            sx={{
              width: "50%",
              height: "100%",
              backgroundImage: `url(http://localhost:5000/category/${
                data ? data[3].image : ""
              })`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "fit",
            }}
          ></Box>
        </FlexBetween>
      </Box>
      <Box
        gridColumn={"span 6"}
        gridRow={"span 2"}
        pr={1.5}
        ml={"-15px"}
        sx={{
          backgroundColor: colors.background.default,
          overflow: "hidden",
          zIndex: 1200,
          objectFit: "fill",
          clipPath: "polygon(5% 100%, 0% 0%, 85% 0%, 100% 100%)",
        }}
      >
        <FlexBetween
          sx={{
            height: "100%",
            backgroundColor: colors.background.alt,
          }}
        >
          <Stack p={3} ml={10}>
            <Typography variant="h4" color={colors.primary[100]}>
              {data ? data[2].name : ""}
            </Typography>
            <Link>
              <Button
                type="button"
                sx={{
                  mt: "10px",
                  padding: "12px 25px",
                  borderRadius: "8px",
                  backgroundColor: colors.background.default,
                  color: colors.primary[100],
                }}
              >
                Shop Now
              </Button>
            </Link>
          </Stack>
          <Box
            sx={{
              width: "50%",
              height: "100%",
              backgroundImage: `url(http://localhost:5000/category/${
                data ? data[2].image : ""
              })`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "fit",
            }}
          ></Box>
        </FlexBetween>
      </Box>
    </Box>
  );
};
export default TopSliding;
