import { OpenInNew } from '@mui/icons-material';
import { Button, Link } from '@mui/material';
import { RendererT } from '../../../types/types';

const RenderUrl = ({ label, value }: RendererT) => {
  return (
    <Button fullWidth={false} component={Link} href={value} target="_blank" endIcon={<OpenInNew />}>
      Open {label}
    </Button>
  );
};

export default RenderUrl;
