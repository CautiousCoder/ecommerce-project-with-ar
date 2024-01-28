import { Box, useTheme } from "@mui/material";
import { ResponsiveChoropleth } from "@nivo/geo";
import Header from "../../components/Header";
import { useGetGeographyQuery } from "../../state/api";
import { geoData } from "../../state/geoData";

const Geography = () => {
  const theme = useTheme();
  const colors = theme.palette;

  const { data } = useGetGeographyQuery();

  return (
    <Box margin={"12px 10px"}>
      <Header title={"Geography"} subTitle={"User geo-location show"} />
      <Box
        mt={1}
        height={"75vh"}
        width={"100%"}
        border={`1px solid ${colors.background[200]}`}
        borderRadius={1}
      >
        {data ? (
          <ResponsiveChoropleth
            data={data}
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
            features={geoData.features}
            margin={{ top: 10, right: 0, bottom: 0, left: -40 }}
            colors="nivo"
            domain={[0, 1000000]}
            unknownColor="#666666"
            label="properties.name"
            valueFormat=".2s"
            projectionScale={150}
            projectionTranslation={[0.45, 0.6]}
            projectionRotation={[0, 0, 0]}
            enableGraticule={true}
            graticuleLineColor="#dddddd"
            borderWidth={1.3}
            borderColor="#fff"
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: true,
                translateX: 0,
                translateY: -125,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: colors.primary[200],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: colors.primary[50],
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        ) : (
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
};
export default Geography;
