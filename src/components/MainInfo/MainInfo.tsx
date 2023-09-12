import { useRef, useMemo } from 'react';
import { Box, Divider, Stack, useMediaQuery } from '@mui/material';
import { headerHeight, mediaQueries, spacings, tabsHeight } from '../DesignSystem/DesignSystem';
import MainInfoSidebar from './Sidebar';
import { getAvailibleData, getMainInfoStructure, scrollMarginTop } from './utils';
import MainInfoArticle from './Article';
import useObserver from '../../hooks/useObserver';
import useAvailableHeight from '../../hooks/useAvailibleHeight';
import { MainInfoProps } from '../../types/types';

const MainInfo = ({ zaaktype, loading }: MainInfoProps) => {
  const articleRefs = useRef<HTMLElement[]>([]);
  const tabletDevice = useMediaQuery(mediaQueries.tablet);
  const availibleHeight = useAvailableHeight(articleRefs.current?.pop());
  const mainInfoStructure = useMemo(() => getMainInfoStructure(zaaktype), [zaaktype]);
  const availibleData = useMemo(() => getAvailibleData(mainInfoStructure), [mainInfoStructure]);

  const observerHookData = useObserver(articleRefs, {
    rootMargin: -1 - headerHeight - tabsHeight + 48 + 'px',
  });

  const currentScrolledIndex = useMemo(() => {
    return Object.keys(observerHookData)
      .map((key) => observerHookData[key])
      .findIndex((item: any) => item.isIntersecting === true);
  }, [observerHookData]);

  return (
    <Stack
      spacing={spacings.xlarge}
      useFlexGap
      display={!tabletDevice ? 'grid' : 'flex'}
      justifyContent={'space-between'}
      gridTemplateColumns={!tabletDevice ? `minmax(0, 720px) 240px` : 'unset'}
    >
      <Stack spacing={spacings.xlarge} divider={<Divider />}>
        {mainInfoStructure.map((data, i) => {
          // no data, no row
          if (!loading && !availibleData?.[i]) return;

          return (
            <Box
              key={i}
              id={data.slug}
              ref={(instance: HTMLElement) => (articleRefs.current[i] = instance)}
              sx={{ scrollMarginTop: scrollMarginTop }}
            >
              <MainInfoArticle loading={loading} {...data} />
            </Box>
          );
        })}

        <Box height={availibleHeight} />
      </Stack>
      {!tabletDevice && (
        <MainInfoSidebar
          scrolledIndex={currentScrolledIndex}
          zaaktype={zaaktype}
          loading={loading}
        />
      )}
    </Stack>
  );
};

export default MainInfo;
