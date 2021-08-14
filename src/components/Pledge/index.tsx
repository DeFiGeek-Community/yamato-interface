import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useFetchingMyPledge } from '../../state/pledge/hooks';
import Collateral from './Collateral';

export default function Pledge() {
  const fetchingMyPledge = useFetchingMyPledge();

  // one shot
  useEffect(() => {
    fetchingMyPledge(10, 10, Date.now() / 1000 + 1000);
  }, []);

  return (
    <Box border="1px" borderColor="gray.200" borderRadius="md" p={4} h="100%">
      <Collateral />
    </Box>
  );
}
