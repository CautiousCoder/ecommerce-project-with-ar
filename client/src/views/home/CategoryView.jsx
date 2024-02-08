import { Box, CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const CategoryView = ({ data, isNonMobile = true, colors }) => {
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
      {data?.map((item) => (
        <Box gridColumn={"span 2"} gridRow={"span 3"}>
          <Link to={`/frontend/category/${item._id}`}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140px !important"
                  image={`http://localhost:5000/category/${item.image}`}
                  alt="category"
                  sx={{
                    height: "140px",
                  }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </Box>
      ))}
    </Box>
  );
};
export default CategoryView;
