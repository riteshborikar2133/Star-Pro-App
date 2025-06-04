// src/constants/ThemeContext.tsx
import React, {createContext, useContext} from 'react';
import colors from './colors';

const ThemeContext = createContext({theme: colors});

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <ThemeContext.Provider value={{theme: colors}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
