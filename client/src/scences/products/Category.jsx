import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";

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
  return (
    <Box margin={"20px"}>
      <Header title={"Category"} subTitle={"For your products categories."} />
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
          rows={data || []}
          columns={columns}
          slots={{
            columnMenu: CustomColumnMenu,
          }}
        />
      </Box>
    </Box>
  );
};
export default Category;
