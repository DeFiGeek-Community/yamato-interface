import {
    defaultConfig,
    createSystem,
    defineConfig,
  } from "@chakra-ui/react";

const chakraConfig = defineConfig({
    theme: {
      tokens: {
        colors: {
          brand: {
            white: { value: "#FCFAF2" },
            green: { value: "#5BAD92" },
            greenlight: { value: "#84C7B1" },
            greendark: { value: "#3E9A7C" },
            pink: { value: "#F9AEA5" },
            pinklight: { value: "#FFCCC5" },
            pinkdark: { value: "#DF8276" },
          },
        },
      },
    },
  });

export const config = createSystem(defaultConfig, chakraConfig);