import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useFetchingMyPledge } from '../../state/pledge/hooks';
import Collateral from './Collateral';

export default function Pledge() {
  const fetchingMyPledge = useFetchingMyPledge();

  // one shot
  useEffect(() => {
    fetchingMyPledge(10, 10);
  }, []);

  return (
    <Box border="1px" borderColor="gray.200" borderRadius="md" p={4} h="100%">
      <Collateral />
    </Box>
  );
}
