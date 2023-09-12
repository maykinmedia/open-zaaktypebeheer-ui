import Button from '@mui/material/Button';
import { MoreHoriz } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { spacings } from '../DesignSystem/DesignSystem';
import { MouseEvent, useState } from 'react';
import Menu from '../Menu/Menu';
import { MenuItems } from '../../types/types';
import { useNavigate } from 'react-router-dom';

export default function DetailpageActions({ concept }: { concept?: boolean }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const onOpenMenu = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const onCloseMenu = () => setAnchorEl(null);

  const menuItems: MenuItems[] = [
    {
      component: 'a',
      label: 'Wijzig in admin',
      onClick: onCloseMenu,
      // @ts-expect-error href and target are not a valid MenuItem props, but are required for the `a` tag.
      href: import.meta.env.VITE_ADMIN_URL, // Should be changed to configured admin url defined in the admin.
      target: '_blank',
    },
  ];

  return (
    <Stack direction={'row'} spacing={spacings.small}>
      <Menu menuItems={menuItems} anchorEl={anchorEl} onCloseMenu={onCloseMenu} />
      <Button
        onClick={onOpenMenu}
        variant="outlined"
        size="large"
        sx={{ minWidth: 47.5, minHeight: 47.5, p: 0 }}
      >
        <MoreHoriz />
      </Button>
      {concept && (
        <Button
          disableElevation
          variant="contained"
          size="large"
          onClick={() => navigate('wijzigen')}
        >
          Wijzigen zaaktype
        </Button>
      )}
    </Stack>
  );
}
