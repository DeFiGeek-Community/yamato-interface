import { Helmet } from 'react-helmet';
import InfographicsTool from '../components/InfographicsTool';
import Layout from '../components/Layout';

export default function Tools() {
  return (
    <Layout>
      <Helmet title="Yamato Tools" />
      <InfographicsTool />
    </Layout>
  );
}
