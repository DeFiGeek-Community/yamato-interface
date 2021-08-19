import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useFetchingMyPledge } from '../../state/pledge/hooks';
import { CategoryTitle } from '../CommonItem';
import Collateral from './Collateral';
import Debt from './Debt';

export default function Pledge() {
  const fetchingMyPledge = useFetchingMyPledge();

  // one shot
  useEffect(() => {
    fetchingMyPledge(10, 5, Date.now() / 1000 + 1000);
  }, []);

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
