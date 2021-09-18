import { CategoryTitle, ConentBox, HeaderBox1 } from '../CommonItem';
import LogViewer from './LogViewer';

export default function World() {
  return (
    <>
      <HeaderBox1>
        <CategoryTitle>real time TX</CategoryTitle>
      </HeaderBox1>
      <ConentBox>
        <LogViewer />
      </ConentBox>
    </>
  );
}
