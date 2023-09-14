import Header from '../components/Header/Header';
import Page from '../components/Page/Page';
import useCalculatedSize from '../hooks/useCalculatedSize';
import useSiteTree from '../hooks/useSiteTree';

export default function BaseView() {
  const siteTree = useSiteTree();
  const headerHeight = useCalculatedSize('header');
  return (
    <>
      <Header siteTree={siteTree} headerHeight={headerHeight} />
      <Page />
    </>
  );
}
