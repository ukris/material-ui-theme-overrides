import { createMuiTheme, Theme, responsiveFontSizes } from "@material-ui/core/styles";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type from "@material-ui/lab/themeAugmentation";

const breakpoints = createBreakpoints({});
export const primaryColor = "#051e34";
export const secondaryColor = "#00cec9";
export const fallback = "#d3d3d3";
export const fog =
  "linear-gradient(180deg, rgba(0,0,0,0.21) 4%, rgba(255,255,255,0.6) 168%)";

const theme: Theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: primaryColor
    },
    secondary: {
      main: secondaryColor
    },
    fallback: {
      main: fallback
    },
    fog: {
      main: fog
    }
  },
  overrides: {
    MuiCard: {
      root: {
        width: 300,
        height: 350,
        margin: 15,
        [breakpoints.down("sm")]: {
          margin: 5
        }
      }
    }
  },
  props: {
    MuiSkeleton: {
      animation: "pulse"
    },
    MuiAvatar: {
      variant: "rounded"
    }
  }
});

const responsiveFontSizesTheme = responsiveFontSizes(theme);

export default responsiveFontSizesTheme;
