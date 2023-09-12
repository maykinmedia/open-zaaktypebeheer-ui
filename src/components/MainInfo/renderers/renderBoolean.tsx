import { Typography } from '@mui/material';
import { RendererT } from '../../../types/types';

const RenderBoolean = ({ value }: RendererT) => {
  return <Typography variant="body1">{value ? 'Ja' : 'Nee'}</Typography>;
};

export default RenderBoolean;
