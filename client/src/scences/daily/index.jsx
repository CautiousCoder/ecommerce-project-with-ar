import { Box, Stack, Typography, useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { useMemo, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../../components/Header";
import { useGetSalesQuery } from "../../state/api";

const Daily = () => {
  const theme = useTheme();
  const colors = theme.palette;

  const [startDate, setStartDate] = useState(new Date("2021-02-01"));
  const [endDate, setEndDate] = useState(new Date("2021-03-01"));
  const { data, isLoading } = useGetSalesQuery();

  const [formattedDate] = useMemo(() => {
    if (!data) return [];

    const { dailyData } = data;
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

    // iterate object
    Object.values(dailyData).forEach(({ date, totalSales, totalUnits }) => {
      const dateFormated = new Date(date);
      if (dateFormated >= startDate && dateFormated <= endDate) {
        const splitDate = date.substring(date.indexOf("-") + 1);

        // append data to initials object
        totalSalesLine.data = [
          ...totalSalesLine.data,
          { x: splitDate, y: totalSales },
        ];
        totalUnitsLine.data = [
          ...totalUnitsLine.data,
          { x: splitDate, y: totalUnits },
        ];
      }
    });
    const formattedDate = [totalSalesLine, totalUnitsLine];
    return [formattedDate];
  }, [data, startDate, endDate]);

  return (
    <Box margin={"1.5rem 2.5rem"} height={"75vh"}>
      <Header title={"DAILY SALES"} subTitle={"Chart for daily sales"} />
      <Box display={"flex"} justifyContent={"flex-end"} mt={"-20px"}>
        <Stack mr={"10px"}>
          <Typography variant="h6" color={colors.primary[10]}>
            Start Date
          </Typography>
          <ReactDatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
        </Stack>
        <Stack>
          <Typography variant="h6" color={colors.primary[10]}>
            End Date
          </Typography>
          <ReactDatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </Stack>
      </Box>
      {data ? (
        <ResponsiveLine
          data={formattedDate}
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
          colors={{ datum: "color" }}
          margin={{ top: 50, right: 100, bottom: 70, left: 40 }}
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
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 90,
            legend: "Month",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Total",
            legendOffset: -50,
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
          legends={[
            {
              anchor: "top-right",
              direction: "column",
              justify: false,
              translateX: 70,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.9,
              symbolSize: 14,
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
          ]}
        />
      ) : (
        "Loading..."
      )}
    </Box>
  );
};
export default Daily;
