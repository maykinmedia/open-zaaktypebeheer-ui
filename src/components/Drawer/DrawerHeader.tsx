import { styled } from '@mui/material';

const DrawerHeader = styled('section')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  justifyContent: 'space-between',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default DrawerHeader;
