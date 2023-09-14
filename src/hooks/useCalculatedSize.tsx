import { useMediaQuery } from '@mui/material';
import { componentSize, mediaQueries } from '../components/DesignSystem/DesignSystem';

const useCalculatedSize = (component: keyof typeof componentSize) => {
  const smallerThanLaptop = useMediaQuery(mediaQueries.laptop);
  return smallerThanLaptop ? componentSize[component].default : componentSize[component].laptop;
};

export default useCalculatedSize;
