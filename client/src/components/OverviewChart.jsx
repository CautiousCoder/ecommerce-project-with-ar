import { useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { useMemo } from "react";
import { useGetSalesQuery } from "../state/api";

const OverviewChart = ({ isDashboard = false, view }) => {
  const theme = useTheme();
  const colors = theme.palette;
  const { data, isLoading } = useGetSalesQuery();
  //   console.log("data", data);

  // formate should look like {id:id, color:color, cordinate:{x:x, y:y}}
  const [totalSalesLine, totalUnitsLine] = useMemo(() => {
    if (!data) return [];

    const { monthlyData } = data;
    const totalSalesLine = {
      id: "totalSales",
      color: colors.background[200],
      data: [],
    };
    const totalUnitsLine = {
      id: "totalUnits",
      color: colors.primary[200],
      data: [],
    };

    // iterate object and generate [key, value] pair object
    Object.values(monthlyData).reduce(
      (acc, { month, totalSales, totalUnits }) => {
        const currentSales = acc.sales + totalSales;
        const currentUnits = acc.sales + totalUnits;

        // append data to initials object
        totalSalesLine.data = [
          ...totalSalesLine.data,
          { x: month, y: currentSales },
        ];
        totalUnitsLine.data = [
          ...totalUnitsLine.data,
          { x: month, y: currentUnits },
        ];
        return { sales: currentSales, units: currentUnits };
      },
      { sales: 0, units: 0 }
    );
    return [[totalSalesLine], [totalUnitsLine]];
  }, [data]);

  if (!data || isLoading) return "Loading...";

  return (
    <ResponsiveLine
      data={view === "units" ? totalUnitsLine : totalSalesLine}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.primary[200],
            },
          },
          legend: {
            text: {
              fill: colors.primary[200],
            },
          },
          ticks: {
            line: {
              stroke: colors.primary[200],
              strokeWidth: 1,
            },
            text: {
              fill: colors.primary[200],
            },
          },
        },
        legends: {
          text: {
            fill: colors.primary[200],
          },
        },
        tooltip: {
          container: {
            color: colors.background[700],
          },
        },
      }}
      margin={
        isDashboard
          ? { top: 5, right: 60, bottom: 25, left: 70 }
          : { top: 20, right: 60, bottom: 50, left: 70 }
      }
      curve="catmullRom"
      enableArea={isDashboard}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: (v) => {
          if (isDashboard) return v.slice(0, 3);
          return v;
        },
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? "" : "Month",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard
          ? ""
          : `Total ${view === "sales" ? "Revenue" : "Units"} for year.`,
        legendOffset: -60,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={
        isDashboard
          ? undefined
          : [
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 30,
                translateY: -40,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
      }
    />
  );
};
export default OverviewChart;
