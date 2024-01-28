import {
  DownloadOutlined,
  Email,
  PersonAddOutlined,
  PointOfSale,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreackDownChart from "../../components/BreakDownChart";
import FlexBetween from "../../components/FlexBetween";
import Header from "../../components/Header";
import OverviewChart from "../../components/OverviewChart";
import StatBox from "../../components/StatBox";
import { useGetDashboardQuery } from "../../state/api";

const Dashboard = () => {
  const theme = useTheme();
  const colors = theme.palette;

  // media query
  const isNonMobile = useMediaQuery("(min-width: 1200px)");

  const { data, isLoading } = useGetDashboardQuery();

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
    <Box margin={"0.5rem 1.25rem"}>
      <FlexBetween>
        <Header title={"Dashboard"} subTitle={"Wellcome to your Dashboard"} />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.secondary.light,
              color: colors.background.alt,
              fontSize: "13px",
              fontWeight: "bold",
              padding: "8px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} /> Download Reports
          </Button>
        </Box>
      </FlexBetween>
      <Box
        mt={"10px"}
        display={"grid"}
        gridTemplateColumns={"repeat(12, 1fr)"}
        gridAutoRows={"46px"}
        gap={1.5}
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 12" },
        }}
      >
        <StatBox
          title={"Total Customers"}
          value={data && data.totalCustomers}
          increase={"+17%"}
          descriptions={"Since last month"}
          icon={<Email sx={{ color: colors.primary[300], fontSize: "26px" }} />}
        />
        <StatBox
          title={"Monthly Sales"}
          value={data && data.thisDayState.totalSales}
          increase={"+21%"}
          descriptions={"Since last month"}
          icon={
            <PointOfSale
              sx={{ color: colors.primary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn={"span 8"}
          gridRow={"span 4"}
          backgroundColor={colors.background.alt}
          p={"1rem"}
          borderRadius={"0.55rem"}
        >
          <OverviewChart view={"sales"} isDashboard={true} />
        </Box>
        <StatBox
          title={"Sales Today"}
          value={data && data.thisMonthStats.totalSales}
          increase={"+9%"}
          descriptions={"Since last month"}
          icon={
            <PersonAddOutlined
              sx={{ color: colors.primary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title={"Yearly Sales"}
          value={data && data.thisDayState.totalSales}
          increase={"+42%"}
          descriptions={"Last Year"}
          icon={
            <PointOfSale
              sx={{ color: colors.primary[300], fontSize: "26px" }}
            />
          }
        />

        {/* Row 2 */}
        <Box
          gridColumn={"span 8"}
          gridRow={"span 5"}
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
              minHeight: "44px !important",
            },
            "& .MuiDataGrid-row": {
              maxHeight: "44px !important",
              minHeight: "44px !important",
            },
            "& .MuiDataGrid-toolbarcontainer .MuiDataGrid-text": {
              color: `${colors.primary[100]} !important`,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: colors.background.alt,
              color: colors.primary[50],
              borderTop: "none",
              minHeight: "44px !important",
            },
            "& ::-webkit-scrollbar": {
              width: "0.6em !important",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.background[600],
            },
            "& ::-webkit-scrollbar-track": {
              backgroundColor: colors.background[400],
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
          />
        </Box>
        <Box
          gridColumn={"span 4"}
          gridRow={"span 5"}
          p={"1rem"}
          borderRadius={"0.55rem"}
          sx={{
            backgroundColor: colors.background.alt,
          }}
        >
          <Typography
            variant="h6"
            fontSize={"0.8rem"}
            color={colors.primary[100]}
          >
            Sales By Category
          </Typography>
          <BreackDownChart isDashboard={true} />
          <Typography
            p={"0 0 0.6rem"}
            fontSize={"0.75rem"}
            color={colors.primary[200]}
          >
            Breakdown of real states and information via category for revenue
            made for this year and total sales
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default Dashboard;
