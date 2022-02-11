import { useMediaQueryContext } from '../../MediaQueryProvider';
import InfographicsToolMobile from './InfographicsTool-mobile';
import InfographicsToolPC from './InfographicsTool-pc';

export default function InfographicsTool() {
  const { isMobileSite } = useMediaQueryContext();
  if (isMobileSite) {
    return <InfographicsToolMobile />;
  } else {
    return <InfographicsToolPC />;
  }
}
