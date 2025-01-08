import {
  HStack,
  Text,
  Link,
  Box,
  Container,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import SvgYamatoLogWithTitle from "@/svgs/YamatoLogoWithTitle";
import CJPYLogo from "@/svgs/CjpyLogo";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useWalletBalanceContext } from "@/contexts/WalletBalanceContext";
import { formatPriceForDisplay } from "@/utils";

export default function Header() {
  const location = useRouter();
  const { cjpyBalance } = useWalletBalanceContext();

  const { t } = useTranslation();

  const isActiveLink = (path: string) => location.pathname === path;

  return (
    <Container>
      <Flex justifyContent="space-between" align="center" wrap="wrap" p="2">
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
        <HStack>
          <Box
            borderRadius={"full"}
            borderColor={"brand.green"}
            borderWidth="1px"
            px="2"
          >
            <HStack>
              <CJPYLogo width="35px" />
              <VStack gap={0} align={"left"}>
                <Text fontSize={"sm"} color={"gray"}>
                  balance
                </Text>
                <Text
                  fontWeight={"bold"}
                  color={"brand.greendark"}
                  textStyle="lg"
                >
                  {formatPriceForDisplay(cjpyBalance)} CJPY
                </Text>
              </VStack>
            </HStack>
          </Box>
          <ConnectButton label={t("layout.walletconnect")} />
        </HStack>
      </Flex>
    </Container>
  );
}
