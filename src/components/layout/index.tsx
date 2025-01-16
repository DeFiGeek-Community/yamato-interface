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
          padding: '20px',
          backgroundImage: `url(${BackgroundImage})`,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
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
