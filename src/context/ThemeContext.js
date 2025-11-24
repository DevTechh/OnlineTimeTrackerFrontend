import { useColorScheme } from 'nativewind';
import React, { createContext, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { colorScheme, toggleColorScheme, setColorScheme } = useColorScheme();

  return (
    <ThemeContext.Provider 
      value={{ 
        theme: colorScheme, 
        toggleTheme: toggleColorScheme, 
        setTheme: setColorScheme,
        // isDark sadece 'dark' olduğunda true döner
        isDark: colorScheme === 'dark' 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);