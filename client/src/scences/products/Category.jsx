import { AddCircleOutline } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import Header from "../../components/Header";

// data grid column structure
const columns = [
  {
    field: "_id",
    headerName: "ID",
    flex: 1,
  },
  {
    field: "image",
    headerName: "Image",
    flex: 1,
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },
  {
    field: "dex",
    headerName: "Description",
    flex: 2,
  },
];

const Category = () => {
  const theme = useTheme();
  const colors = theme.palette;
  return (
    <Box margin={"20px"}>
      <FlexBetween>
        <Header title={"Category"} subTitle={"For your products categories."} />
        <Link to={"/products/category/add"}>
          <Box
            display={"flex"}
            gap={0.5}
            mb={"-30px !important"}
            mr={5}
            p={"10px 20px"}
            sx={{
              backgroundColor: colors.background.alt,
              borderRadius: "8px",
              border: `1px solid ${colors.primary[200]}`,
              cursor: "pointer",
            }}
          >
            <AddCircleOutline sx={{ color: colors.primary[100] }} />
            <Typography
              variant="h5"
              textTransform={"capitalize"}
              color={colors.primary[100]}
            >
              Add Category
            </Typography>
          </Box>
        </Link>
      </FlexBetween>
      <Box
        mt={3}
        height={"72vh"}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.background.alt,
            color: colors.primary[50],
            borderBottom: "none",
          },
          "& .MuiDataGrid-toolbarcontainer .MuiDataGrid-text": {
            color: `${colors.primary[100]} !important`,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: colors.background.alt,
            color: colors.primary[50],
            borderTop: "none",
          },
          "& ::-webkit-scrollbar": {
            width: "0.6em !important",
          },
          "& ::-webkit-scrollbar-track": {
            backgroundColor: colors.background.default,
          },
          "& ::-webkit-scrollbar-thumb": {
            backgroundColor: colors.secondary[400],
            outline: `1px solid ${colors.primary[400]}`,
          },
          "& ::-webkit-scrollbar-thumb:hover": {
            backgroundColor: colors.background[100],
            outline: `1px solid ${colors.primary[900]}`,
          },
        }}
      >
        <DataGrid
          loading={true}
          getRowId={(row) => row._id}
          rows={[]}
          columns={columns}
        />
      </Box>
    </Box>
  );
};
export default Category;
