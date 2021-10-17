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
        <CoreRedemption />
        <Sweep />
      </ConentBox>
    </>
  );
}
