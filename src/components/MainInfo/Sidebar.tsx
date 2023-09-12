import { ListItemText, Skeleton, Stack, Typography, styled } from '@mui/material';
import { spacings } from '../DesignSystem/DesignSystem';
import { widthText } from '../../utils/text';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { getAvailibleData, getMainInfoStructure, scrollMarginTop } from './utils';
import { memo, useMemo } from 'react';
import { HashLink } from 'react-router-hash-link';
import { MainInfoSidebarProps } from '../../types/types';

const MainInfoSidebar = ({ zaaktype, loading, scrolledIndex }: MainInfoSidebarProps) => {
  const dataStructure = useMemo(() => getMainInfoStructure(zaaktype), [zaaktype]);
  const availibleData = useMemo(() => getAvailibleData(dataStructure), [dataStructure]);

  return (
    <Stack
      component={'aside'}
      spacing={spacings.small}
      position={'sticky'}
      top={scrollMarginTop}
      height={'fit-content'}
    >
      <Typography variant="h3" component="h2">
        {loading ? <Skeleton width={widthText('In dit zaaktype:', 6.5)} /> : 'In dit zaaktype:'}
      </Typography>
      <nav aria-label="Zaaktype sidebar">
        <List disablePadding>
          {dataStructure.map((row: any, i: number) => {
            if (!loading && !availibleData?.[i]) return; // no data, no row, no sidebar item
            return (
              <ListItem key={i} disablePadding sx={{ borderLeft: 1, borderColor: 'divider' }}>
                <ListItemButton
                  component={styled(HashLink)({})}
                  smooth
                  to={loading ? '' : '#' + row.slug}
                  selected={loading ? false : scrolledIndex === i}
                >
                  <ListItemText>
                    {loading ? <Skeleton key={i} width={widthText(row.label, 6.5)} /> : row.label}
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </nav>
    </Stack>
  );
};

export default memo(MainInfoSidebar);
