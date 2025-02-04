import { Box } from '@chakra-ui/react';
import { CategoryTitle, ConentBox, HeaderBox2 } from '../CommonItem';
import Collateral from './Collateral';
import Debt from './Debt';

export default function Pledge() {
  return (
    <>
      <HeaderBox2>
        <CategoryTitle>My Pledge</CategoryTitle>
      </HeaderBox2>
      <ConentBox>
        <Collateral />
        <Box borderBottom="1px solid" borderColor="gray.200" mt={4} />
        <Debt />
      </ConentBox>
    </>
  );
}
