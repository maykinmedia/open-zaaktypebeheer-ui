import { Typography } from '@mui/material';

interface RenderStringProps {
  label?: string;
  value: any;
}

const RenderString = ({ value }: RenderStringProps) => {
  return <Typography variant="body1">{value}</Typography>;
};

export default RenderString;
