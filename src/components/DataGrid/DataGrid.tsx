import { DataGrid as DataGridComponent, GridRowParams } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import {
  createGridColDef,
  dataGridLocaleText,
  inititialColumnVisibilityModel,
  rowsWithId,
} from './utils';
import { useNavigate } from 'react-router-dom';
import { DataGridProps } from '../../types/types';
import DataGridToolbar from './Toolbar';

export default function DataGrid({ data }: DataGridProps) {
  const navigate = useNavigate();
  const handleNavigate = (params: GridRowParams<any>) => () => {
    navigate('/' + params.row.id);
  };
  const rows = rowsWithId(data);
  const columnVisibilityModel = inititialColumnVisibilityModel(data);
  const gridColDef = createGridColDef(data, handleNavigate);

  return (
    <Box
      component={'section'}
      sx={{
        height: 600,
        width: '100%',
      }}
    >
      <DataGridComponent
        slots={{
          toolbar: DataGridToolbar,
        }}
        initialState={{
          columns: {
            columnVisibilityModel,
          },
        }}
        columns={gridColDef}
        rows={rows}
        localeText={dataGridLocaleText}
        disableColumnMenu
        disableRowSelectionOnClick
        hideFooter
      />
    </Box>
  );
}
