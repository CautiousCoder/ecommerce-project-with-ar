import { Box, Typography, useTheme } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import { useGetSalesQuery } from "../state/api";

const BreackDownChart = ({ isDashboard = false }) => {
  const { data, isLoading } = useGetSalesQuery();
  const theme = useTheme();
  const colors = theme.palette;

  const colorPalette = [
    colors.secondary[200],
    colors.secondary[100],
    colors.secondary[100],
    colors.secondary[200],
  ];
  if (!data || isLoading) return "Loading...";
  const formattedData = Object.entries(data.salesByCategory).map(
    ([category, sales], i) => ({
      id: category,
      label: category,
      value: sales,
      color: colorPalette,
    })
  );

  return (
    <Box
      height={isDashboard ? "190px" : "100%"}
      width={undefined}
      minHeight={isDashboard ? "190px" : undefined}
      minWidth={isDashboard ? "250px" : undefined}
      position={"relative"}
    >
      <ResponsivePie
        data={formattedData}
        margin={
          isDashboard
            ? { top: 10, right: 80, bottom: 10, left: 50 }
            : { top: 40, right: 80, bottom: 80, left: 80 }
        }
        theme={{
          axis: {
            domain: {
              line: {
                stroke: colors.redAccent[200],
              },
            },
            legend: {
              text: {
                fill: colors.redAccent[200],
              },
            },
            ticks: {
              line: {
                stroke: colors.redAccent[200],
                strokeWidth: 1,
              },
              text: {
                fill: colors.redAccent[200],
              },
            },
          },
          legends: {
            text: {
              fill: colors.primary[100],
            },
          },
          tooltip: {
            container: {
              color: colors.background[800],
            },
          },
        }}
        sortByValue={true}
        innerRadius={0.45}
        padAngle={0.3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={colors.primary[100]}
        arcLinkLabel={isDashboard}
        arcLinkLabelsThickness={isDashboard ? 0 : 2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: isDashboard ? 20 : 0,
            translateY: isDashboard ? 50 : 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: colors.primary[200],
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: colors.primary[200],
                },
              },
            ],
          },
        ]}
      />
      <Box
        position={"absolute"}
        top={"50%"}
        left={"50%"}
        color={colors.secondary[300]}
        textAlign={"center"}
        sx={{
          transform: isDashboard
            ? "translate(-80%, -60%)"
            : "translate(-50%, -100%)",
        }}
      >
        <Typography variant="h6">
          {!isDashboard && "Totol : "} ${data.yearlySalesTotal}
        </Typography>
      </Box>
    </Box>
  );
};
export default BreackDownChart;
