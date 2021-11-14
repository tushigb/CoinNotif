import * as React from 'react';
import {useColorScheme} from 'react-native';

import {Light, Dark} from './Colors';

export const ThemeContext = React.createContext({
  isDark: false,
  colors: Light,
  setScheme: () => {},
});

export const ThemeProvider = props => {
  // Getting the device color theme, this will also work with react-native-web
  const colorScheme = useColorScheme(); // Can be dark | light | no-preference

  /*
   * To enable changing the app theme dynamicly in the app (run-time)
   * we're gonna use useState so we can override the default device theme
   */
  const [isDark, setIsDark] = React.useState(colorScheme === 'dark');
  // const [isDark, setIsDark] = React.useState(true);

  // Listening to changes of device appearance while in run-time
  React.useEffect(() => {
    setIsDark(isDark);
  }, [colorScheme, isDark]);

  const defaultTheme = {
    isDark,
    // Chaning color schemes according to theme
    colors: isDark ? Dark : Light,
    // Overrides the isDark value will cause re-render inside the context.
    setScheme: scheme => setIsDark(scheme === 'dark'),
  };

  return (
    <ThemeContext.Provider value={defaultTheme}>
      {props.children}
    </ThemeContext.Provider>
  );
};

// Custom hook to get the theme object returns {isDark, colors, setScheme}
export const useTheme = () => React.useContext(ThemeContext);
