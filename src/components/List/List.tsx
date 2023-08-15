import {
  List as ListMaterial,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { SiteTreeT } from '../../types/types';

const List = ({ siteTreeOptions }: SiteTreeT) => (
  <ListMaterial>
    {siteTreeOptions?.map((option) => (
      <ListItem key={option.label} onClick={option.onClick} disablePadding>
        <ListItemButton>
          {option.Icon && <ListItemIcon>{option.Icon}</ListItemIcon>}
          <ListItemText primary={option.label} />
        </ListItemButton>
      </ListItem>
    ))}
  </ListMaterial>
);

export default List;
