import { OpenInNew } from '@mui/icons-material';
import { Link } from '@mui/material';

interface RenderUrlProps {
  label?: string;
  value: any;
}

const RenderUrl = ({ label, value }: RenderUrlProps) => {
  return (
    <Link variant="body1" href={value} target="_blank" display={'flex'} gap={1} alignItems="center">
      Open {label}
      <OpenInNew fontSize="small" />
    </Link>
  );
};

export default RenderUrl;
