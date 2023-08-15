import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import { useAuth } from '../Auth/Auth';
import signOutHandler from '../../utils/signOut';
import { siteTree } from '../../utils/siteTree';

export default function Header() {
  const auth = useAuth();
  const navigate = useNavigate();
  const signOut = signOutHandler(auth, navigate);
  const siteTreeOptions = siteTree(navigate, signOut);

  return (
    <AppBar component={'header'} position="sticky" color="transparent" elevation={3}>
      <Toolbar component={'section'}>
        <Button onClick={() => navigate('/')}>
          <Logo height={40} />
        </Button>
        <Box flexGrow={1} />
        <Navigation navigate={navigate} siteTreeOptions={siteTreeOptions} />
      </Toolbar>
    </AppBar>
  );
}
