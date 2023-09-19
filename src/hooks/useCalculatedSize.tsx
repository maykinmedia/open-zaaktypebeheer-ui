import { useMediaQuery } from '@mui/material';
import { mediaQueries } from '../components/DesignSystem/DesignSystem';

export const componentSize = {
  header: {
    default: 64,
    laptop: 84,
  },
  tabs: {
    default: 48,
    laptop: 48,
  },
};

const useCalculatedSize = (component: keyof typeof componentSize) => {
  const smallerThanLaptop = useMediaQuery(mediaQueries.laptop);
  return smallerThanLaptop ? componentSize[component].default : componentSize[component].laptop;
};

export default useCalculatedSize;
