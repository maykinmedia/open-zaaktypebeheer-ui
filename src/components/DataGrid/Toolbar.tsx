import { Tune } from '@mui/icons-material';
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

const DataGridToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton startIcon={<Tune />} size="medium" />
      <GridToolbarDensitySelector size="medium" />
    </GridToolbarContainer>
  );
};

export default DataGridToolbar;
