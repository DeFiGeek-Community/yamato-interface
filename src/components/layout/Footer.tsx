import { Box, HStack, VStack, Link, Text, Flex } from "@chakra-ui/react";
import { Organizer, ReferenceList } from "@/constants/about";
import CommunityLogoBlack from "@/svgs/CommunityLogoBlack";
import { NativeSelectField, NativeSelectRoot } from "../ui/native-select";
import i18next, { i18n } from "i18next";

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

export default function Footer() {
  return (
    <Flex justify="space-between" align="center" wrap="wrap">
      <Box />
      <Box display="flex" alignItems="center">
        <CommunityLogoBlack width="5rem" height="5rem" />
        <VStack>
          <Text>© {Organizer}</Text>
          <HStack>
            <Link
              href={ReferenceList.forum}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Text>Forum</Text>
            </Link>
            <Link
              href={ReferenceList.discord}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Text>Discord</Text>
            </Link>
            <Link
              href={ReferenceList.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Text>GitHub</Text>
            </Link>
            <Link
              href={ReferenceList.document}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Text>Document</Text>
            </Link>
          </HStack>
        </VStack>
      </Box>
      <Box>
        <LangugeChange />
      </Box>
    </Flex>
  );
}
