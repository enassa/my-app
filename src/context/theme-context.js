import React from "react";
import { useState } from "react";

const AppThemeContext = React.createContext(undefined);
const AppThemeProvider = ({ children }) => {
  const [theme, setActiveTheme] = useState("light");
  const [appStyle, setAppStyle] = useState("classic");

  const colors = {
    bgOne: "bg-stone-800 ",
    bgTwo: "",
    bgThree: "",
    bgFour: "",
    bgFive: "",
    textOne: "",
    textTwo: "",
    textThree: "",
    textFour: "",
    thextFive: "",
  };
  const fonts = {
    fontOne: "",
    fontTwo: "",
    fontThree: "",
    fontFour: "",
    fontFive: "",
  };
  const themeOptions = {
    dark: "dark",
    light: "light",
    navy: "navy",
  };
  const appStyles = {
    classic: "classic",
    modern: "modern",
  };
  const changeTheme = (value) => {
    setActiveTheme(value);
  };
  const changeAppStyle = (value) => {
    setAppStyle(value);
  };
  return (
    <AppThemeContext.Provider
      value={{
        theme,
        themeOptions,
        colors,
        fonts,
        appStyle,
        appStyles,
        changeTheme,
        changeAppStyle,
      }}
    >
      {children}
    </AppThemeContext.Provider>
  );
};

export const useThemeContext = () => React.useContext(AppThemeContext);
export default AppThemeProvider;
