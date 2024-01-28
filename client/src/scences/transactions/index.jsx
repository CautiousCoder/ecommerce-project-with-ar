import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar";
import Header from "../../components/Header";
import { useGetTransactionsQuery } from "../../state/api";

const Transactions = () => {
  const theme = useTheme();
  const colors = theme.palette;

  // state for filter
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  // const [paginationModel, setPaginationModel] = useState({
  //   page: 0,
  //   pageSize: 20,
  // });
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // load data
  // let page = paginationModel.page;
  // let pageSize = paginationModel.page;
  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });
  console.log("obj", data);

  // data grid column structure
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      sortable: false,
      flex: 0.4,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];
  return (
    <Box margin={"10px 10px"}>
      <Header title={"Transaction"} subTitle={"Entire List of Transactions"} />
      <Box
        mt={3}
        height={"74vh"}
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
          "& .MuiBox-root": {
            marginTop: "-15px !important",
          },
        }}
      >
        <DataGrid
          loading={!data || isLoading}
          getRowId={(row) => row._id}
          rows={(data && data.transactions) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          pagination
          pageSizeOptions={[20, 50, 100]}
          paginationMode="server"
          sortingMode="server"
          page={page}
          pageSize={pageSize}
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortMode) => setSort(...newSortMode)}
          slots={{ toolbar: DataGridCustomToolbar }}
          slotProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
};
export default Transactions;
