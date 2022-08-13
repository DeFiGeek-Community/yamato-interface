import { HStack, VStack } from '@chakra-ui/layout';
import { Grid, GridItem } from '@chakra-ui/react';
import i18next from 'i18next';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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

  const { t } = useTranslation();

  function changeLanguage(i18next: any, lang: any) {
    i18next.changeLanguage(lang);
  }

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
    <Grid
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(2, 1fr)"
      gap={4}
    >
      <GridItem rowSpan={1} colSpan={1}>
        <Link to="/">
          <SvgYamatoLogWithTitle width={422} height={50} />
        </Link>
      </GridItem>
      <div>
        <div>
          <button
            style={{
              fontSize: '1.6rem',
              fontWeight: 'bold',
              color: '#5BAD92',
              margin: '2rem',
            }}
            onClick={() => changeLanguage(i18next, 'en')}
          >
            en
          </button>
          <button
            style={{
              fontSize: '1.6rem',
              fontWeight: 'bold',
              color: '#5BAD92',
              margin: '2rem',
            }}
            onClick={() => changeLanguage(i18next, 'ja')}
          >
            ja
          </button>
        </div>
      </div>
      <GridItem
        rowSpan={1}
        colEnd={4}
        style={{
          margin: 'auto',
        }}
      >
        <HStack>
          <Web3Status />
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
              {t('layout.tool')}
            </Link>
          </VStack>
        </HStack>
      </GridItem>
    </Grid>
  );
}
