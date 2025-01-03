import { HStack, Link, Box, Container, Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import SvgYamatoLogWithTitle from "@/svgs/YamatoLogoWithTitle";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
  const location = useRouter();

  const { t } = useTranslation();

  const isActiveLink = (path: string) => location.pathname === path;

  return (
    <Container>
      <Flex justifyContent="space-between" align="center">
        <HStack>
          <Link href="/#/">
            <SvgYamatoLogWithTitle width={300} height={75} />
          </Link>
          {/* <Link
            href="/#/"
            fontWeight={isActiveLink("/") ? "bold" : "normal"}
            pointerEvents={isActiveLink("/") ? "none" : "auto"}
            opacity={isActiveLink("/") ? 0.6 : 1}
            ml={8}
          >
            <Text fontWeight="bold"> {t("layout.home")}</Text>
          </Link> */}
          {/* <Link
              href="/#/tools/"
              fontWeight={isActiveLink("/tools/") ? "bold" : "normal"}
              pointerEvents={isActiveLink("/tools/") ? "none" : "auto"}
              opacity={isActiveLink("/tools/") ? 0.6 : 1}
            >
              {t("layout.tool")}
            </Link> */}
        </HStack>
        <Box>
          <ConnectButton label={t("layout.walletconnect")} />
        </Box>
      </Flex>
    </Container>
  );
}
