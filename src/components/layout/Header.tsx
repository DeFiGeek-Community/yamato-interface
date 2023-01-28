import { HStack, VStack } from '@chakra-ui/layout';
import {
  Grid,
  GridItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from '@chakra-ui/react';
import i18next from 'i18next';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BsGlobe2 } from 'react-icons/bs';
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

const LanguageButton = styled.button`
  margin: 0 1rem;
`;

const GlobeIcon = styled(BsGlobe2)`
  font-size: 3rem;
  color: ${({ theme }) => theme.bg1};
`;

const LanguageListButton = styled.button`
  font-size: 1.6rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text1};
`;

const changeLanguage = (i18next: any, lang: any) => {
  i18next.changeLanguage(lang);
};

export function LangugeChange() {
  return (
    <Popover trigger="hover">
      <PopoverTrigger>
        <LanguageButton>
          <GlobeIcon />
        </LanguageButton>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <>
            <VStack>
              <LanguageListButton onClick={() => changeLanguage(i18next, 'en')}>
                english
              </LanguageListButton>
              <LanguageListButton onClick={() => changeLanguage(i18next, 'ja')}>
                日本語
              </LanguageListButton>
            </VStack>
          </>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default function Header() {
  const { active, account } = useActiveWeb3React();

  const blockNumber = useBlockNumber();
  const [isMounting, setIsMounting] = useState(false);

  const { t } = useTranslation();

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
      <GridItem
        rowSpan={1}
        colEnd={4}
        style={{
          margin: 'auto',
        }}
      >
        <HStack>
          <LangugeChange />
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
