import { Box } from "@chakra-ui/react";
import BackgroundImage from "@/assets/images/background_main.webp";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <Box bg="brand.white">
        <Header />
      </Box>
      <Box bg="brand.greenlight" p="2">
        {children}
      </Box>
      <Box bg="brand.white">
        <Footer />
      </Box>
    </Box>
  );
}
