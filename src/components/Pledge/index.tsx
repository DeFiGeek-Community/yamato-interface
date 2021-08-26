import { Box } from '@chakra-ui/react';
import { CategoryTitle } from '../CommonItem';
import Collateral from './Collateral';
import Debt from './Debt';

export default function Pledge() {
  return (
    <>
      <Box border="1px" borderColor="gray.200" borderRadius="md" p={4}>
        <CategoryTitle>My Pledge</CategoryTitle>
      </Box>
      <Box border="1px" borderColor="gray.200" borderRadius="md" p={4}>
        <Collateral />
        <Debt />
      </Box>
    </>
  );
}
