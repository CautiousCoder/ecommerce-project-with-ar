import { Box, useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { useMemo } from "react";
import Header from "../../components/Header";
import { useGetSalesQuery } from "../../state/api";

const Monthly = () => {
  const theme = useTheme();
  const colors = theme.palette;

  const { data } = useGetSalesQuery();

  const [formattedDate] = useMemo(() => {
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

    // iterate object
    Object.values(monthlyData).forEach(({ month, totalSales, totalUnits }) => {
      // append data to initials object
      totalSalesLine.data = [
        ...totalSalesLine.data,
        { x: month, y: totalSales },
      ];
      totalUnitsLine.data = [
        ...totalUnitsLine.data,
        { x: month, y: totalUnits },
      ];
    });
    const formattedDate = [totalSalesLine, totalUnitsLine];
    return [formattedDate];
  }, [data]);

  // test data
  const testData = [
    {
      id: "japan",
      color: "hsl(46, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 227,
        },
        {
          x: "helicopter",
          y: 14,
        },
        {
          x: "boat",
          y: 195,
        },
        {
          x: "train",
          y: 56,
        },
        {
          x: "subway",
          y: 289,
        },
        {
          x: "bus",
          y: 17,
        },
        {
          x: "car",
          y: 49,
        },
        {
          x: "moto",
          y: 1,
        },
        {
          x: "bicycle",
          y: 246,
        },
        {
          x: "horse",
          y: 293,
        },
        {
          x: "skateboard",
          y: 252,
        },
        {
          x: "others",
          y: 170,
        },
      ],
    },
    {
      id: "france",
      color: "hsl(210, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 122,
        },
        {
          x: "helicopter",
          y: 20,
        },
        {
          x: "boat",
          y: 274,
        },
        {
          x: "train",
          y: 206,
        },
        {
          x: "subway",
          y: 58,
        },
        {
          x: "bus",
          y: 219,
        },
        {
          x: "car",
          y: 34,
        },
        {
          x: "moto",
          y: 144,
        },
        {
          x: "bicycle",
          y: 220,
        },
        {
          x: "horse",
          y: 42,
        },
        {
          x: "skateboard",
          y: 90,
        },
        {
          x: "others",
          y: 218,
        },
      ],
    },
    {
      id: "us",
      color: "hsl(116, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 278,
        },
        {
          x: "helicopter",
          y: 163,
        },
        {
          x: "boat",
          y: 10,
        },
        {
          x: "train",
          y: 130,
        },
        {
          x: "subway",
          y: 83,
        },
        {
          x: "bus",
          y: 247,
        },
        {
          x: "car",
          y: 123,
        },
        {
          x: "moto",
          y: 148,
        },
        {
          x: "bicycle",
          y: 288,
        },
        {
          x: "horse",
          y: 8,
        },
        {
          x: "skateboard",
          y: 110,
        },
        {
          x: "others",
          y: 273,
        },
      ],
    },
    {
      id: "germany",
      color: "hsl(50, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 245,
        },
        {
          x: "helicopter",
          y: 91,
        },
        {
          x: "boat",
          y: 138,
        },
        {
          x: "train",
          y: 222,
        },
        {
          x: "subway",
          y: 189,
        },
        {
          x: "bus",
          y: 154,
        },
        {
          x: "car",
          y: 148,
        },
        {
          x: "moto",
          y: 271,
        },
        {
          x: "bicycle",
          y: 10,
        },
        {
          x: "horse",
          y: 134,
        },
        {
          x: "skateboard",
          y: 236,
        },
        {
          x: "others",
          y: 228,
        },
      ],
    },
    {
      id: "norway",
      color: "hsl(49, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 200,
        },
        {
          x: "helicopter",
          y: 18,
        },
        {
          x: "boat",
          y: 64,
        },
        {
          x: "train",
          y: 202,
        },
        {
          x: "subway",
          y: 104,
        },
        {
          x: "bus",
          y: 37,
        },
        {
          x: "car",
          y: 3,
        },
        {
          x: "moto",
          y: 226,
        },
        {
          x: "bicycle",
          y: 203,
        },
        {
          x: "horse",
          y: 13,
        },
        {
          x: "skateboard",
          y: 153,
        },
        {
          x: "others",
          y: 159,
        },
      ],
    },
  ];
  return (
    <Box margin={"1.5rem 2.5rem"} height={"75vh"}>
      <Header title={"DAILY SALES"} subTitle={"Chart for daily sales"} />
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
export default Monthly;
