import { DataGrid as MuiDataGrid, DataGridProps as MuiDataGridProps, nlNL } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import DataGridToolbar from './Toolbar';
import DataGridLoadingOverlay from './LoadingOverlay';
import { useState } from 'react';

export type DataGridProps = MuiDataGridProps & {
  height?: number;
  loading?: boolean;
  showQuickFilter?: boolean;
};

const DataGrid = ({
  loading,
  height,
  showQuickFilter,
  columnVisibilityModel,
  ...rest
}: DataGridProps) => {
  const [visibilityModel, setVisibilityModel] = useState(columnVisibilityModel);
  return (
    <Box
      component={'section'}
      sx={{
        height: height ? height : 1000,
        width: '100%',
      }}
    >
      <MuiDataGrid
        // Default props
        {...rest}
        // Data
        rows={loading ? [] : rest.rows} // Disable rows if loading needed to make sure the loading overlay is the only thing shown
        // Buffer columns
        columnBuffer={7}
        columnThreshold={7}
        // Components / slots
        slots={{
          loadingOverlay: DataGridLoadingOverlay,
          toolbar: DataGridToolbar,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: showQuickFilter,
          },
        }}
        // State / settings
        loading={loading}
        localeText={nlNL.components.MuiDataGrid.defaultProps.localeText}
        disableColumnMenu
        disableRowSelectionOnClick
        // local handling of column visibility
        onColumnVisibilityModelChange={(model) => {
          setVisibilityModel(model);
        }}
        columnVisibilityModel={visibilityModel}
      />
    </Box>
  );
};

export default DataGrid;
