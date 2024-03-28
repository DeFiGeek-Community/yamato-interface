import { HStack, VStack } from '@chakra-ui/layout';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Link,
  Box,
  Container,
  Text,
  Flex,
} from '@chakra-ui/react';
import i18next from 'i18next';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BsTranslate } from 'react-icons/bs';
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

const TranslateIcon = styled(BsTranslate)`
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
          <TranslateIcon />
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
    <Box
      px={{ base: 0, md: 4 }}
      position={'sticky'}
      top={'0'}
      zIndex={100}
      bg={'#fcfaf2'}
      opacity={0.975}
    >
      <Container maxW="container.2xl" px={{ base: 2, md: 9 }}>
        <Flex
          as="header"
          py="4"
          justifyContent="space-between"
          alignItems="center"
        >
          <HStack fontSize="16px" color="#818181" style={{ gap: '1.9rem' }}>
            <Link href="/">
              <SvgYamatoLogWithTitle width={200} height={30} />
            </Link>
            <Link
              href="/"
              _hover={{ textDecoration: 'none' }}
              style={{
                pointerEvents: 'none',
                opacity: 0.6,
                marginLeft: '2rem',
              }}
            >
              <Text fontWeight="bold">HOME</Text>
            </Link>
            <Link href="https://ve-interface.vercel.app/" _hover={{ textDecoration: 'none' }}>
              <Text fontWeight="bold">veYMT</Text>
            </Link>
          </HStack>
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
        </Flex>
      </Container>
    </Box>
  );
}
