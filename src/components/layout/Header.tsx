import { HStack, Link, Box, Container, Flex } from "@chakra-ui/react";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select";
import i18next, { i18n } from "i18next";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import SvgYamatoLogWithTitle from "@/svgs/YamatoLogoWithTitle";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const changeLanguage = (i18next: i18n, lang: string) => {
  i18next.changeLanguage(lang);
};

export function LangugeChange() {
  return (
    <NativeSelectRoot bg={"brand.whitelight"}>
      <NativeSelectField
        placeholder="Language"
        value={i18next.language}
        onChange={(e) => changeLanguage(i18next, e.currentTarget.value)}
      >
        <option value="en">English</option>
        <option value="ja">日本語</option>
      </NativeSelectField>
    </NativeSelectRoot>
  );
}

export default function Header() {
  const location = useRouter();

  const { t } = useTranslation();

  const isActiveLink = (path: string) => location.pathname === path;

  return (
    <Container>
      <Flex justifyContent="space-between" wrap="wrap">
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
          <Box>
            <LangugeChange />
          </Box>{" "}
          <ConnectButton label={t("layout.walletconnect")} />
        </HStack>
      </Flex>
    </Container>
  );
}
