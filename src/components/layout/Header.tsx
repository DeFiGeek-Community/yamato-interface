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
import { useTranslation } from 'react-i18next';
import { BsTranslate } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Web3Status from '../WalletConnectButton';
import SvgYamatoLogWithTitle from '../svgs/YamatoLogoWithTitle';

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
  const location = useLocation();

  const { t } = useTranslation();

  const isActiveLink = (path: string) => location.pathname === path;

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
            <Link href="/#/">
              <SvgYamatoLogWithTitle width={200} height={30} />
            </Link>
            <Link
              href="/#/"
              style={
                isActiveLink('/')
                  ? {
                      fontWeight: 'bold',
                      pointerEvents: 'none',
                      opacity: 0.6,
                      marginLeft: '2rem',
                    }
                  : { marginLeft: '2rem' }
              }
            >
              <Text fontWeight="bold"> {t('layout.home')}</Text>
            </Link>
            <Link
              href="/#/tools/"
              style={
                isActiveLink('/tools/')
                  ? { fontWeight: 'bold', pointerEvents: 'none', opacity: 0.6 }
                  : { fontWeight: 'bold' }
              }
            >
              {t('layout.tool')}
            </Link>
          </HStack>
          <HStack>
            <LangugeChange />
            <Web3Status />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
