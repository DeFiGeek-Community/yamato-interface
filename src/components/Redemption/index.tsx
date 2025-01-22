import { Divider } from '@chakra-ui/react';
import { CategoryTitle, ConentBox, HeaderBox2 } from '../CommonItem';
import CoreRedemption from './CoreRedemption';
import SelfRedemption from './SelfRedemption';
import Sweep from './Sweep';

export default function Redemption() {
  return (
    <>
      <HeaderBox2>
        <CategoryTitle>Functions</CategoryTitle>
      </HeaderBox2>
      <ConentBox>
        <SelfRedemption />
        <Divider my={6} borderColor="gray.200" />
        <CoreRedemption />
        <Divider my={6} borderColor="gray.200" />
        <Sweep />
      </ConentBox>
    </>
  );
}
