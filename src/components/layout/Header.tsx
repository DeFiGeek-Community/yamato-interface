import {
  HStack,
  NativeSelectField,
  NativeSelectRoot,
  Link,
  Box,
  Container,
  Text,
  Flex,
} from "@chakra-ui/react";
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
    <NativeSelectRoot>
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
    <Box position="sticky" opacity={0.975}>
      <Container>
        <Flex as="header" justifyContent="space-between" alignItems="center">
          <HStack color="#818181">
            <Link href="/#/">
              <SvgYamatoLogWithTitle width={200} height={30} />
            </Link>
            <Link
              href="/#/"
              fontWeight={isActiveLink("/") ? "bold" : "normal"}
              pointerEvents={isActiveLink("/") ? "none" : "auto"}
              opacity={isActiveLink("/") ? 0.6 : 1}
              ml={8}
            >
              <Text fontWeight="bold"> {t("layout.home")}</Text>
            </Link>
            <Link
              href="/#/tools/"
              fontWeight={isActiveLink("/tools/") ? "bold" : "normal"}
              pointerEvents={isActiveLink("/tools/") ? "none" : "auto"}
              opacity={isActiveLink("/tools/") ? 0.6 : 1}
            >
              {t("layout.tool")}
            </Link>
          </HStack>
          <HStack>
            <LangugeChange /> <ConnectButton />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
