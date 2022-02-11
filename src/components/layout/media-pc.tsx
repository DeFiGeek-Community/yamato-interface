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
    <>
      <Helmet title={title ?? 'Yamato Protocol Interface'} />

      <Box p={4} style={{ backgroundColor: '#FCFAF2' }}>
        <Header />
      </Box>

      <Box
        style={{
          padding: '20px',
          backgroundImage: `url(${BackgroundImage})`,
        }}
      >
        {children}
      </Box>

      <Box style={{ backgroundColor: '#FCFAF2' }}>
        <Footer />
      </Box>
    </>
  );
}
