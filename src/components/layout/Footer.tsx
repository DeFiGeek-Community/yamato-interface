import { Box, HStack, VStack, Spacer } from '@chakra-ui/layout';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Organizer, ReferenceList } from '../../constants/about';
import { useActiveWeb3React } from '../../hooks/web3';
import { useBlockNumber } from '../../state/application/hooks';
import { Text } from '../CommonItem';
import CommunityLogoBlack from '../svgs/CommunityLogoBlack';

const FooterItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: 20px;
`;

const StyledPollingNumber = styled.div<{
  breathe: boolean;
}>`
  font-size: 1rem;
  color: #5bad92;
  transition: opacity 0.25s ease;
  opacity: ${({ breathe }) => (breathe ? 0.5 : 1)};
`;

export default function Footer() {
  const { active, account } = useActiveWeb3React();
  const blockNumber = useBlockNumber();
  const [isMounting, setIsMounting] = useState(false);

  useEffect(() => {
    if (!blockNumber) {
      return;
    }

    setIsMounting(true);
    const mountingTimer = setTimeout(() => setIsMounting(false), 1000);

    return () => {
      clearTimeout(mountingTimer);
    };
  }, [blockNumber]);

  return (
    <HStack
      justify="space-between"
      alignItems="center"
      style={{
        padding: '8px 16px',
        width: '100%',
        flexWrap: 'wrap',
        gap: '1rem',
      }}
    >
      <Spacer />
      <Box display="flex" alignItems="center">
        <CommunityLogoBlack width="5rem" height="5rem" />
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
            <a
              href={ReferenceList.document}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Text>Document </Text>
            </a>
          </FooterItem>
        </VStack>
      </Box>
      <Spacer />
      <StyledPollingNumber breathe={isMounting}>
        {active && account && `block:${blockNumber}`}
      </StyledPollingNumber>
    </HStack>
  );
}
