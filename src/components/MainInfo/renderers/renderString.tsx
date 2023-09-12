import { Typography } from '@mui/material';
import { RendererT } from '../../../types/types';

const RenderString = ({ value }: RendererT) => {
  return <Typography variant="body1">{value}</Typography>;
};

export default RenderString;
