import { extendTheme } from '@chakra-ui/react';

export default extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: '#05071A',
        color: '#EEEFFC',
        fontFamily: ["'Nunito', sans-serif"],
      },
    }),
  },
  components: {},
});
