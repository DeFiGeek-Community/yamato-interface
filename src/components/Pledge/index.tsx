import { Box } from '@chakra-ui/react';
import Collateral from './Collateral';

export default function Pledge() {
  return (
    <Box border="1px" borderColor="gray.200" borderRadius="md" p={4} h="100%">
      <Collateral />
    </Box>
  );
}
