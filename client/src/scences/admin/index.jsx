import { AddCircleOutline } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import CustomColumnMenu from "../../components/DataGridCustomColumnMenu";
import FlexBetween from "../../components/FlexBetween";
import Header from "../../components/Header";
import { useGetAdminsQuery } from "../../state/api";

const Admin = () => {
  const theme = useTheme();
  const colors = theme.palette;
  const { data, isLoading } = useGetAdminsQuery();
  //   console.log("object", data);

  // data grid column structure
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.2,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.6,
      renderCell: (params) => {
        return params.value.replace(/^(\d{5})(\d{5})/, "(+88)$1-$2");
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    },
  ];

  return (
    <Box margin={"12px 10px"}>
      <FlexBetween>
        <Header
          title={"ADMINS"}
          subTitle={"Managing admins and list of admins "}
        />
        <Link to={"/users/add"}>
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
              Add User
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
          loading={!data || isLoading}
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
export default Admin;
