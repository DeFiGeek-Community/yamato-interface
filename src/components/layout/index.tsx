import { Box, Container } from "@chakra-ui/react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <Box bg="brand.white">
        <Header />
      </Box>
      <Box bg="brand.greensuperlight" p="2">
        <Container>{children}</Container>
      </Box>
      <Box bg="brand.white">
        <Footer />
      </Box>
    </Box>
  );
}
