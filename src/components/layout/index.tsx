import { useMediaQueryContext } from '../../MediaQueryProvider';
import LayoutMobile from './media-mobile';
import LayoutPC from './media-pc';
import LayoutTablet from './media-tablet';

export default function Layout(props: {
  title?: string;
  children: React.ReactNode;
}) {
  const { isMobileSite, isTabletSite, isPcSite } = useMediaQueryContext();
  if (isMobileSite) {
    return <LayoutMobile {...props} />;
  } else if (isTabletSite) {
    return <LayoutTablet {...props} />;
  } else {
    return <LayoutPC {...props} />;
  }
}
