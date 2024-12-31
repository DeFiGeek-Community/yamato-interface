import {
  Box,
  Button,
  ButtonProps,
  Input,
  InputProps,
  Text as ChakraText,
} from "@chakra-ui/react";

export const Text = (props: React.ComponentProps<typeof ChakraText>) => (
  <ChakraText
    fontStyle="normal"
    fontWeight={500}
    fontSize="1.4rem"
    lineHeight="1.6rem"
    color="gray.700"
    {...props}
  />
);
