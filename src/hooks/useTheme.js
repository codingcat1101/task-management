import React from "react";
import { ThemeContext } from "../utils/theme";

export const useTheme = () => React.useContext(ThemeContext);
