import { ExternalLinkIcon } from '@chakra-ui/icons';
import { YAMATO_MAIN_ADDRESSES } from '../../constants/addresses';
import { useActiveWeb3React } from '../../hooks/web3';
import { ExplorerDataType, getExplorerLink } from '../../utils/getExplorerLink';
import { CategoryTitle, ConentBox, HeaderBox1 } from '../CommonItem';
import { ExternalLink } from '../ExternalLink';
import LogViewer from './LogViewer';

export default function World() {
  const { chainId } = useActiveWeb3React();

  return (
    <>
      <HeaderBox1>
        <CategoryTitle>
          Real Time TX{' '}
          <ExternalLink
            href={getExplorerLink(
              chainId ?? 0,
              YAMATO_MAIN_ADDRESSES[chainId ?? 0],
              ExplorerDataType.ADDRESS
            )}
          >
            <ExternalLinkIcon />
          </ExternalLink>
        </CategoryTitle>
      </HeaderBox1>
      <ConentBox>
        <LogViewer />
      </ConentBox>
    </>
  );
}
