import * as React from "react";
import { ThemeProvider } from "./theme";
import MyComponent from "./Component";

export default function App() {
  return (
    <ThemeProvider>
      <MyComponent />
    </ThemeProvider>
  );
}
