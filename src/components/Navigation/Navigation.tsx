import { useState } from 'react';
import { IconButton, Stack, useMediaQuery, Link } from '@mui/material';
import Drawer from '../Drawer/Drawer';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { ToggleDrawerFunction } from '../../types/types';
import { spacings } from '../DesignSystem/DesignSystem';

interface NavigationProps {
  siteTree: {
    label: string;
    to: string;
    onClick?: () => void;
  }[];
  headerHeight: number;
}

const Navigation = ({ siteTree, headerHeight }: NavigationProps) => {
  const [open, setOpen] = useState(false);
  const mobileDevice = useMediaQuery('(max-width:768px)');

  const toggleDrawer: ToggleDrawerFunction = (newState) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(newState);
  };

  if (mobileDevice)
    return (
      <>
        <IconButton onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <Drawer
          headerHeight={headerHeight}
          siteTree={siteTree}
          open={open}
          toggleDrawer={toggleDrawer}
        />
      </>
    );

  return (
    <Stack component={'nav'} direction="row" useFlexGap spacing={spacings.large} width={'100%'}>
      {siteTree.map(({ label, ...rest }, index) => (
        <Link
          {...rest}
          key={label}
          component={RouterLink}
          variant="body1"
          color="text.primary"
          underline="hover"
          sx={{
            ml: index === siteTree.length - 1 ? 'auto' : 0,
          }}
        >
          {label}
        </Link>
      ))}
    </Stack>
  );
};

export default Navigation;
