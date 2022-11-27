import { extendTheme } from "@chakra-ui/react";

export default extendTheme({
  fonts: {
    body: ["'Nunito', sans-serif"],
  },
  styles: {
    global: () => ({
      body: {
        bg: "white",
      },
    }),
  },
  components: {},
});
