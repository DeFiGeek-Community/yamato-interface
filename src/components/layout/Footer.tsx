import { Box, HStack, VStack } from '@chakra-ui/layout';
import styled from 'styled-components';
import { Organizer, ReferenceList } from '../../constants/about';
import { Text } from '../CommonItem';
import CommunityLogoBlack from '../svgs/CommunityLogoBlack';

const FooterItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: 20px;
`;

export default function Footer() {
  return (
    <HStack justify="center" style={{ padding: '8px' }}>
      <Box alignItems="center">
        <CommunityLogoBlack width="5rem" height="5rem" />
      </Box>
      <VStack p={4} style={{ margin: '0', padding: '0' }}>
        <Text>© {Organizer}</Text>
        <FooterItem>
          <a
            href={ReferenceList.forum}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Text>Forum </Text>
          </a>
          <a
            href={ReferenceList.discord}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Text>Discord </Text>
          </a>
          <a
            href={ReferenceList.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Text>GitHub </Text>
          </a>
        </FooterItem>
      </VStack>
    </HStack>
  );
}
