import { Box } from '@chakra-ui/react';
import { CategoryTitle } from '../CommonItem';
import SelfRedemption from './SelfRedemption';
import YamatoRedemption from './YamatoRedemption';
import YamatoSubrogation from './YamatoSweep';

export default function Redemption() {
  return (
    <>
      <Box border="1px" borderColor="gray.200" borderRadius="md" p={4}>
        <CategoryTitle>Functions</CategoryTitle>
      </Box>
      <Box border="1px" borderColor="gray.200" borderRadius="md" p={4}>
        <SelfRedemption />
        <YamatoRedemption />
        <YamatoSubrogation />
      </Box>
    </>
  );
}
