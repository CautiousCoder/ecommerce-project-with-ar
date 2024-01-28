/*
 * Title: Theme Setting
 *Description: Control color Light and Dark mode
 *Author : MD. ZAHIDUL ISLAM
 *Description:  01/14/2024 formate: mm/dd/YYYY
 */

// declare color variables for dark mode
export const tokensDark = {
  grey: {
    0: "#ffffff",
    10: "#f6f6f6",
    50: "#f0f0f0",
    100: "#e0e0e0",
    200: "#c2c2c2",
    300: "#a3a3a3",
    400: "#858585",
    500: "#666666",
    600: "#525252",
    700: "#3d3d3d",
    800: "#292929",
    900: "#141414",
    1000: "#000000",
  },
  black: {
    100: "#cccccc",
    200: "#999999",
    300: "#666666",
    400: "#333333",
    500: "#000000",
    600: "#000000",
    700: "#000000",
    800: "#000000",
    900: "#000000",
  },
  greenAccent: {
    100: "#dbf5ee",
    200: "#b7ebde",
    300: "#94e2cd",
    400: "#70d8bd",
    500: "#4cceac",
    600: "#3da58a",
    700: "#2e7c67",
    800: "#1e5245",
    900: "#0f2922",
  },
  redAccent: {
    100: "#f8dcdb",
    200: "#f1b9b7",
    300: "#e99592",
    400: "#e2726e",
    500: "#db4f4a",
    600: "#af3f3b",
    700: "#832f2c",
    800: "#58201e",
    900: "#2c100f",
  },
  blueAccent: {
    100: "#efefef",
    200: "#6f7777",
    300: "#8faadc",
    400: "#698ed0",
    500: "#4472c4",
    600: "#365b9d",
    700: "#294476",
    800: "#00416A",
    900: "#002147",
  },
};

// function that reverse the color palettle
const reverseTokens = (tokensDark) => {
  const reverseTokensData = {};
  Object.entries(tokensDark).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reverseObj = {};
    // reverse color tokens
    for (let i = 0; i < length; i++) {
      reverseObj[keys[i]] = values[length - i - 1];
    }
    reverseTokensData[key] = reverseObj;
  });
  return reverseTokensData;
};

// declare color variable for light mode
export const tokensLight = reverseTokens(tokensDark);

// mui theme setting
export const themeSetting = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // for dark mode
            primary: {
              ...tokensDark.grey,
              main: tokensDark.grey[50],
              light: tokensDark.grey[100],
            },
            redAccent: {
              ...tokensDark.redAccent,
            },
            black: {
              ...tokensDark.black,
            },
            secondary: {
              ...tokensDark.greenAccent,
              main: tokensDark.greenAccent[300],
              light: tokensDark.greenAccent[500],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },
            background: {
              ...tokensDark.blueAccent,
              default: tokensDark.blueAccent[900],
              alt: tokensDark.blueAccent[800],
            },
          }
        : {
            // for dark light
            primary: {
              ...tokensLight.grey,
              main: tokensLight.grey[50],
              light: tokensLight.grey[100],
            },
            secondary: {
              ...tokensLight.greenAccent,
              main: tokensLight.greenAccent[300],
              light: tokensLight.greenAccent[700],
            },
            redAccent: {
              ...tokensLight.redAccent,
            },
            black: {
              ...tokensLight.black,
            },
            neutral: {
              ...tokensLight.grey,
              main: tokensLight.grey[500],
            },
            background: {
              ...tokensLight.blueAccent,
              default: tokensLight.blueAccent[900],
              alt: tokensLight.blueAccent[800],
            },
          }),
    },
    typography: {
      fontFamily: ["Ubuntu", "sans-serif"].join(", "),
      fontSize: 12,
      h1: {
        fontFamily: ["Ubuntu", "sans-serif"].join(", "),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Ubuntu", "sans-serif"].join(", "),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Ubuntu", "sans-serif"].join(", "),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Ubuntu", "sans-serif"].join(", "),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Ubuntu", "sans-serif"].join(", "),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Ubuntu", "sans-serif"].join(", "),
        fontSize: 14,
      },
    },
  };
};
