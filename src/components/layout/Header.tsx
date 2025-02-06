import { HamburgerIcon } from '@chakra-ui/icons';
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
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { BsTranslate } from 'react-icons/bs';
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Web3Status from '../WalletConnectButton';
import { ChainInfo } from '../WalletConnectButton';
import CurrencyToggle from '../WalletConnectButton/CurrencyToggle';
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

export function LangugeChange() {
  const history = useHistory();

  const changeLanguage = (i18next: any, lang: any) => {
    i18next.changeLanguage(lang);

    const currentPath = window.location.pathname;

    if (lang === 'en') {
      history.replace(`${currentPath}?lang=en`);
    } else {
      history.replace(currentPath);
    }
  };

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

function MobileNav({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const location = useLocation();
  const { t } = useTranslation();
  const isActiveLink = (path: string) => location.pathname === path;
  const currentSearch = location.search;

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader mt={10}>
          <SvgYamatoLogWithTitle width={150} height={25} />
        </DrawerHeader>
        <DrawerBody>
          <VStack align="start" spacing={6}>
            <Link
              href={`/#/${currentSearch}`}
              onClick={onClose}
              style={
                isActiveLink('/')
                  ? { fontWeight: 'bold', pointerEvents: 'none', opacity: 0.6 }
                  : {}
              }
            >
              <Text fontWeight="bold">{t('layout.home')}</Text>
            </Link>
            <Link
              href={`/#/tools/${currentSearch}`}
              onClick={onClose}
              style={
                isActiveLink('/tools/')
                  ? { fontWeight: 'bold', pointerEvents: 'none', opacity: 0.6 }
                  : { fontWeight: 'bold' }
              }
            >
              {t('layout.tool')}
            </Link>
          </VStack>
        </DrawerBody>
        <DrawerFooter>
          <VStack mx={'auto'} display={{ base: 'flex', sm: 'none' }}>
            <Box pt={4}>
              <ChainInfo />
            </Box>
            <Box pt={4}>
              <LangugeChange />
            </Box>
            <Box pt={4}>
              <CurrencyToggle />
            </Box>
          </VStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default function Header() {
  const location = useLocation();
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isActiveLink = (path: string) => location.pathname === path;

  // 現在のクエリパラメータを取得
  const currentSearch = location.search;

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
          <Box display={{ base: 'block', lg: 'none' }}>
            <IconButton
              aria-label="Open menu"
              icon={<HamburgerIcon boxSize={8} />}
              variant="ghost"
              onClick={onOpen}
              size="lg"
            />
          </Box>
          <HStack
            fontSize="16px"
            color="#818181"
            style={{ gap: '1.9rem' }}
            display={{ base: 'none', lg: 'flex' }}
          >
            <Link href={`/#/${currentSearch}`}>
              <Box>
                <SvgYamatoLogWithTitle width={200} height={30} />
              </Box>
            </Link>
            <Link
              href={`/#/${currentSearch}`}
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
              <Text fontWeight="bold">{t('layout.home')}</Text>
            </Link>
            <Link
              href={`/#/tools/${currentSearch}`}
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
            <Box display={{ base: 'none', md: 'block' }}>
              <LangugeChange />
            </Box>{' '}
            <Web3Status />
          </HStack>
        </Flex>
      </Container>

      {/* Mobile Navigation */}
      <MobileNav isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
