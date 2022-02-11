import { HStack, VStack } from '@chakra-ui/layout';
import { Grid, GridItem } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useActiveWeb3React } from '../../hooks/web3';
import { useBlockNumber } from '../../state/application/hooks';
import Web3Status from '../WalletConnectButton';
import SvgYamatoLogWithTitle from '../svgs/YamatoLogoWithTitle';

const StyledPollingNumber = styled.div<{
  breathe: boolean;
}>`
  font-size: 1rem;
  color: #5bad92;
  transition: opacity 0.25s ease;
  opacity: ${({ breathe }) => (breathe ? 0.5 : 1)};
`;

export default function Header() {
  const { active, account } = useActiveWeb3React();

  const blockNumber = useBlockNumber();
  const [isMounting, setIsMounting] = useState(false);

  useEffect(() => {
    if (!blockNumber) {
      return;
    }

    setIsMounting(true);
    const mountingTimer = setTimeout(() => setIsMounting(false), 1000);

    // this will clear Timeout when component unmount like in willComponentUnmount
    return () => {
      clearTimeout(mountingTimer);
    };
  }, [blockNumber]);

  return (
    <Grid>
      <GridItem>
        <HStack spacing="auto">
          <Link to="/">
            <SvgYamatoLogWithTitle width={200} height={50} />
          </Link>
          <VStack>
            <StyledPollingNumber breathe={isMounting}>
              {active && account && `block:${blockNumber}`}
            </StyledPollingNumber>
            <Link
              to="/tools/"
              style={{
                fontSize: '1.6rem',
                fontWeight: 'bold',
                color: '#5BAD92',
              }}
            >
              ツール
            </Link>
          </VStack>
        </HStack>
      </GridItem>

      <GridItem>
        <Web3Status />
      </GridItem>
    </Grid>
  );
}
