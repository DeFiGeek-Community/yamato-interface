import { CategoryTitle, ConentBox, HeaderBox2 } from '../CommonItem';
import Collateral from './Collateral';
import Debt from './Debt';

export default function Pledge() {
  return (
    <>
      <HeaderBox2>
        <CategoryTitle>My Pledge</CategoryTitle>
      </HeaderBox2>
      <ConentBox>
        <Collateral />
        <Debt />
      </ConentBox>
    </>
  );
}
