import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '../styles/theme';

import 'swiper/swiper-bundle.css';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
