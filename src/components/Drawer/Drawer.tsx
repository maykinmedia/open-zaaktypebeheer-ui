import { Box, IconButton, Divider, SwipeableDrawer, styled } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Logo from '../Logo/Logo';
import List from '../List/List';
import { ToggleDrawerFunction } from '../../types/types';
import { Link } from 'react-router-dom';
import useCalculatedSize from '../../hooks/useCalculatedSize';
import { SiteTree } from '../../hooks/useSiteTree';

const DrawerHeader = styled('section')((props) => {
  const { theme } = props;
  const headerHeight = useCalculatedSize('header');
  return {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2),
    justifyContent: 'space-between',
    height: headerHeight,
  };
});

export interface DrawerT {
  open: boolean;
  toggleDrawer: ToggleDrawerFunction;
  siteTree: SiteTree[];
}

const Drawer = ({ open, toggleDrawer, siteTree }: DrawerT) => {
  return (
    <SwipeableDrawer
      anchor={'right'}
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <Box
        sx={{ width: 240 }}
        component={'nav'}
        onKeyDown={toggleDrawer(false)}
        role="presentation"
      >
        <DrawerHeader>
          <IconButton onClick={toggleDrawer(false)}>
            <ChevronRightIcon />
          </IconButton>
          <Link to="/" onClick={toggleDrawer(false)}>
            <Logo height={32} />
          </Link>
        </DrawerHeader>
        <Divider />
        <List options={siteTree.slice(0, -1)} />
        <Divider />
        <List options={siteTree.slice(-1)} />
      </Box>
    </SwipeableDrawer>
  );
};

export default Drawer;
