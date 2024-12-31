import { Box, HStack, VStack, Link as Link } from "@chakra-ui/react";
import { Organizer, ReferenceList } from "../../constants/about";
import { Text } from "@/components/CommonItem";
import CommunityLogoBlack from "@/svgs/CommunityLogoBlack";

export default function Footer() {
  return (
    <HStack justify="center">
      <Box display="flex" alignItems="center">
        <CommunityLogoBlack width="5rem" height="5rem" />
      </Box>
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
    </HStack>
  );
}
