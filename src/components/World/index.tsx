import { Box } from '@chakra-ui/react';
import { CategoryTitle } from '../CommonItem';
import LogViewer from './LogViewer';

export default function World() {
  return (
    <>
      <Box border="1px" borderColor="gray.200" borderRadius="md" p={4}>
        <CategoryTitle>リアルタイムTX</CategoryTitle>
      </Box>
      <Box border="1px" borderColor="gray.200" borderRadius="md" p={4}>
        <LogViewer />
      </Box>
    </>
  );
}
