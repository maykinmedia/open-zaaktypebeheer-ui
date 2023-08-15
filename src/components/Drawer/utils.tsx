import { Dispatch, SetStateAction } from 'react';

export const toggleDrawer =
  (open: boolean, setOpen: Dispatch<SetStateAction<boolean>>) => (event: any) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(open);
  };
