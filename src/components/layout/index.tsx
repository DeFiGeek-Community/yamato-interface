import { Box } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import BackgroundImage from '../../assets/images/background_main.webp';
import Footer from './Footer';
import Header from './Header';

export default function Layout({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <Box
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Helmet title={title ?? 'Yamato Protocol Interface'} />

      <Box style={{ backgroundColor: '#FCFAF2', flexShrink: 0 }}>
        <Header />
      </Box>

      <Box
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
        px={{ base: 2, sm: 6 }}
        pt={{ base: 2, sm: 4 }}
        pb={{ base: 8 }} // 下部のパディングを大きく設定
      >
        <Box style={{ width: '100%', marginBottom: 'auto' }}>{children}</Box>
      </Box>

      <Box
        style={{
          backgroundColor: '#FCFAF2',
          flexShrink: 0,
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
}
