import { AppBar, Toolbar, Box, Link } from '@mui/material';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import { spacings } from '../DesignSystem/DesignSystem';
import { Link as RouterLink } from 'react-router-dom';
import { SiteTree } from '../../hooks/useSiteTree';

interface HeaderProps {
  siteTree: SiteTree[];
  headerHeight: number;
}

export default function Header({ siteTree, headerHeight }: HeaderProps) {
  return (
    <AppBar
      component={'header'}
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        justifyContent: 'center',
        background: 'white',
        height: headerHeight,
      }}
    >
      <Toolbar component={'section'} sx={{ gap: spacings.medium }}>
        <Link component={RouterLink} to="/" sx={{ height: '70%' }}>
          <Logo height={'100%'} />
        </Link>
        <Box flexGrow={1} />
        <Navigation siteTree={siteTree} />
      </Toolbar>
    </AppBar>
  );
}
