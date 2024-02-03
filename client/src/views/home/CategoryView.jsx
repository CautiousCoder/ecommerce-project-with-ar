import { Box, CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const imageData = [
  { name: "category1", link: "https://picsum.photos/id/1/600/400" },
  { name: "category2", link: "https://picsum.photos/id/4/600/400" },
  { name: "category3", link: "https://picsum.photos/id/7/600/400" },
  { name: "category1", link: "https://picsum.photos/id/11/600/400" },
  { name: "category2", link: "https://picsum.photos/id/41/600/400" },
  { name: "category3", link: "https://picsum.photos/id/17/600/400" },
  { name: "category1", link: "https://picsum.photos/id/51/600/400" },
  { name: "category2", link: "https://picsum.photos/id/8/600/400" },
  { name: "category3", link: "https://picsum.photos/id/3/600/400" },
];

const CategoryView = ({ data = imageData, isNonMobile = true }) => {
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
      {data.map((item) => (
        <Box gridColumn={"span 2"} gridRow={"span 3"}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={item.link}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      ))}
    </Box>
  );
};
export default CategoryView;
