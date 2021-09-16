import { CategoryTitle, ConentBox, HeaderBox1 } from '../CommonItem';
import LogViewer from './LogViewer';

export default function World() {
  return (
    <>
      <HeaderBox1>
        <CategoryTitle>リアルタイムTX</CategoryTitle>
      </HeaderBox1>
      <ConentBox>
        <LogViewer />
      </ConentBox>
    </>
  );
}
