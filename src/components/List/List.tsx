import {
  List as ListMaterial,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Link } from 'react-router-dom';

interface ListProps {
  options: ListOption[];
}

interface ListOption {
  label: string;
  to: string;
  onClick?: () => void;
  Icon?: JSX.Element;
}

const List = ({ options }: ListProps) => (
  <ListMaterial>
    {options.map(({ label, to, Icon, onClick }) => (
      <ListItem key={label} disablePadding>
        <ListItemButton component={Link} to={to} onClick={onClick}>
          {Icon && <ListItemIcon>{Icon}</ListItemIcon>}
          <ListItemText primary={label} />
        </ListItemButton>
      </ListItem>
    ))}
  </ListMaterial>
);

export default List;
