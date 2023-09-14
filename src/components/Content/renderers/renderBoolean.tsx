import { Typography } from '@mui/material';

interface RenderBooleanProps {
  label?: string;
  value: boolean;
}

const RenderBoolean = ({ value }: RenderBooleanProps) => {
  return <Typography variant="body1">{value ? 'Ja' : 'Nee'}</Typography>;
};

export default RenderBoolean;
