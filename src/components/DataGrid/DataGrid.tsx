import {
  DataGrid as DataGridComponent,
  GridColumnVisibilityModel,
  GridRowParams,
} from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { columnVisibilityModel, createGridColDef, dataGridLocaleText, rowsWithId } from './utils';
import { useNavigate } from 'react-router-dom';
import { DataGridProps } from '../../types/types';
import DataGridToolbar from './Toolbar';
import DataGridLoadingOverlay from './LoadingOverlay';
import { useState } from 'react';

export default function DataGrid({ data, loading }: DataGridProps) {
  const [model, setModel] = useState<GridColumnVisibilityModel>(undefined!);
  const navigate = useNavigate();
  const handleClick = (params: GridRowParams<any>) => () => navigate('/zaaktypen/' + params.row.id);
  const rows = rowsWithId(data);
  const gridColDef = createGridColDef(data, handleClick, loading);
  const visibilityModel = columnVisibilityModel(data);

  if (!model && !loading) setModel(visibilityModel);

  return (
    <Box
      component={'section'}
      sx={{
        height: 600,
        width: '100%',
      }}
    >
      <DataGridComponent
        columns={gridColDef}
        slots={{
          loadingOverlay: DataGridLoadingOverlay,
          toolbar: DataGridToolbar,
        }}
        onColumnVisibilityModelChange={(newModel) => {
          setModel(newModel);
        }}
        columnVisibilityModel={model}
        loading={loading}
        rows={rows}
        localeText={dataGridLocaleText}
        disableColumnMenu
        disableRowSelectionOnClick
        hideFooter
      />
    </Box>
  );
}
