import * as React from "react";
import ThemeProvider from "./Theme";
import MyComponent from "./Component";

export default function App() {
  return (
    <ThemeProvider>
      <MyComponent />
    </ThemeProvider>
  );
}
