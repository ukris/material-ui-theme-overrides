import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";

import theme from "./mytheme";

type Props = {
  children: React.ReactNode;
};

const ThemeProvider = ({ children }: Props): React.ReactElement => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
