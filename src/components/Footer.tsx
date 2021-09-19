import { Box, HStack, VStack } from '@chakra-ui/layout';
import styled from 'styled-components';
import CommunityLogo from '../assets/images/communitylogo.png';
import { Organizer, ReferenceList } from '../constants/about';
import { Text } from './CommonItem';

const FooterItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: 20px;
`;

export default function Footer() {
  return (
    <HStack justify="center">
      <Box alignItems="center">
        <img src={CommunityLogo} width="30px" height="30px" />
      </Box>
      <VStack p={4}>
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
