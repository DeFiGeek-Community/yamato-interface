import { useMediaQueryContext } from '../../MediaQueryProvider';
import LayoutMobile from './media-mobile';
import LayoutPC from './media-pc';

export default function Layout(props: {
  title?: string;
  children: React.ReactNode;
}) {
  const { isMobileSite } = useMediaQueryContext();
  if (isMobileSite) {
    return <LayoutMobile {...props} />;
  } else {
    return <LayoutPC {...props} />;
  }
}
