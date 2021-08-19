import { Box } from '@chakra-ui/react';
import SelfRedemption from './SelfRedemption';
import YamatoRedemption from './YamatoRedemption';

export default function Redemption() {
  return (
    <Box border="1px" borderColor="gray.200" borderRadius="md" p={4} h="100%">
      <SelfRedemption />
      <YamatoRedemption />
    </Box>
  );
}
