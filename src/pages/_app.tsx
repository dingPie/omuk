import { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';

import { ThemeProvider, useColorMode, useTheme } from '@chakra-ui/react';

import ToggleColorModeButton from '@components/common/ToggleColorModeButton';
import TokDocsDevTools from '@components/common/TokDocsDevTool';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { mode } from '@theme/foundations/colors';

import './overlay.css';

import withAppProvider from 'contexts/app/app.provider';
import { withGlobalModalHandlerContext } from 'contexts/modal/useGlobalModalHandler.context';

function MyApp({ Component, pageProps }: AppProps) {
  const theme = useTheme();
  const { colorMode } = useColorMode();

  return (
    // Provide the client to your App

    <ThemeProvider
      theme={{ ...theme, colors: { ...theme.colors, ...mode[colorMode] } }}
    >
      <Component {...pageProps} />

      {/* <TokDocsDevTools /> */}
    </ThemeProvider>
  );
}

export default withAppProvider(withGlobalModalHandlerContext(MyApp));
