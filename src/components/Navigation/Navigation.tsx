import { toggleDrawer } from '../Drawer/utils';
import { useState } from 'react';
import { IconButton, Stack, useMediaQuery, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '../Drawer/Drawer';
import { NavigationT } from '../../types/types';

const Navigation = ({ navigate, siteTreeOptions }: NavigationT) => {
  const [open, setOpen] = useState(false);
  const mobileDevice = useMediaQuery('(max-width:768px)');

  if (mobileDevice)
    return (
      <>
        <IconButton onClick={toggleDrawer(true, setOpen)}>
          <MenuIcon />
        </IconButton>

        <Drawer
          open={open}
          setOpen={setOpen}
          navigate={navigate}
          siteTreeOptions={siteTreeOptions}
        />
      </>
    );

  return (
    <Stack direction="row" spacing={2}>
      {siteTreeOptions.map((option, index, array) => {
        return (
          <Button
            key={option.label}
            startIcon={option.Icon}
            variant={index + 1 === array.length ? 'contained' : 'text'}
            onClick={option.onClick}
          >
            {option.label}
          </Button>
        );
      })}
    </Stack>
  );
};

export default Navigation;
