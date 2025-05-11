import React, { createContext, useState, useContext } from "react";
import colors from "./colors";

// Define the shape of our theme object with custom color names
interface Theme {
  primary: string;
  accent1: string;
  accent2: string;
  background: string;
  card: string;
  heading: string;
  subheading: string;
  starArenaFont: string;
  //   interactiveActive: string;
  // Add more theme variables as needed (must match keys in colors.ts)
}

// Define the shape of our context value
interface ThemeContextProps {
  theme: Theme;
  updateTheme: (newTheme: Partial<Theme>) => void;
}

// Create the Theme Context with a default value
const ThemeContext = createContext<ThemeContextProps>({
  theme: colors as Theme, // Type assertion here as 'colors' matches 'Theme'
  updateTheme: () => {},
});

// Create the Theme Provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(colors as Theme); // Type assertion here

  const updateTheme = (newTheme: Partial<Theme>) => {
    setTheme((prevTheme) => ({ ...prevTheme, ...newTheme }));
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Create a custom hook to easily use the theme context
export const useTheme = (): ThemeContextProps => useContext(ThemeContext);
