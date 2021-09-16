import { CategoryTitle, ConentBox, HeaderBox2 } from '../CommonItem';
import SelfRedemption from './SelfRedemption';
import YamatoRedemption from './YamatoRedemption';
import YamatoSubrogation from './YamatoSweep';

export default function Redemption() {
  return (
    <>
      <HeaderBox2>
        <CategoryTitle>Functions</CategoryTitle>
      </HeaderBox2>
      <ConentBox>
        <SelfRedemption />
        <YamatoRedemption />
        <YamatoSubrogation />
      </ConentBox>
    </>
  );
}
