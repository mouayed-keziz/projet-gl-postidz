import ReactDOM from 'react-dom/client'
import App from './App'
import React from 'react';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { AuthContextProvider } from './context/auth-context'
import { NotificationsProvider } from '@mantine/notifications';

const root = ReactDOM.createRoot(document.getElementById('projet-gl'));
root.render(
  <Application />
);



function Application() {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+I', () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <NotificationsProvider>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
