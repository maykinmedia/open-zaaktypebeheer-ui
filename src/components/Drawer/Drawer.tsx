import { Box, IconButton, Button, Divider, SwipeableDrawer } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DrawerHeader from './DrawerHeader';
import Logo from '../Logo/Logo';
import List from '../List/List';
import { toggleDrawer } from './utils';
import { DrawerT } from '../../types/types';

const Drawer = ({ open, setOpen, navigate, siteTreeOptions }: DrawerT) => {
  return (
    <SwipeableDrawer
      anchor={'right'}
      open={open}
      onClose={toggleDrawer(false, setOpen)}
      onOpen={toggleDrawer(true, setOpen)}
    >
      <Box
        sx={{ width: 240 }}
        component={'nav'}
        onKeyDown={toggleDrawer(false, setOpen)}
        role="presentation"
      >
        <DrawerHeader>
          <IconButton onClick={toggleDrawer(false, setOpen)}>
            <ChevronRightIcon />
          </IconButton>
          <Button onClick={() => navigate('/')}>
            <Logo height={32} />
          </Button>
        </DrawerHeader>
        <Divider />
        <List siteTreeOptions={siteTreeOptions.slice(0, -1)} />
        <Divider />
        <List siteTreeOptions={siteTreeOptions.slice(-1)} />
      </Box>
    </SwipeableDrawer>
  );
};

export default Drawer;
