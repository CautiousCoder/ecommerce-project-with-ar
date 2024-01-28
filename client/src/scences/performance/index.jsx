import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import CustomColumnMenu from "../../components/DataGridCustomColumnMenu";
import Header from "../../components/Header";
import { useGetPerformanceQuery } from "../../state/api";

const Performance = () => {
  const theme = useTheme();
  const colors = theme.palette;
  const userId = useSelector((state) => state.global.userId);
  const { data, isLoading } = useGetPerformanceQuery(userId);
  console.log("object", data);

  // data grid column structure
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID ",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Create At",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Product",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 0.5,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box margin={"12px 10px"}>
      <Header title={"PERFORMANCE"} subTitle={"Truck your sale performance"} />
      <Box
        mt={3}
        height={"75vh"}
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
          loading={!data || isLoading}
          getRowId={(row) => row._id}
          rows={(data && data.sales) || []}
          columns={columns}
          slots={{
            columnMenu: CustomColumnMenu,
          }}
        />
      </Box>
    </Box>
  );
};
export default Performance;
