import { Box } from "@chakra-ui/react";
import BackgroundImage from "@/assets/images/background_main.webp";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Box>
        <Header />
      </Box>
      <Box>{children}</Box>
      <Box>
        <Footer />
      </Box>
    </>
  );
}
