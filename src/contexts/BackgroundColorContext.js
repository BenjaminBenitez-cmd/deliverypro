import { createContext } from "react";

export const backgroundColors = {
  primary: "primary",
  blue: "blue",
  green: "success",
};

export const BackgroundColorContext = createContext({
  color: backgroundColors.green,
  changeColor: (color) => {},
});
