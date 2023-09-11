import { GridColDef } from '@mui/x-data-grid';
import { createResultWithTypes, createSingleGridColDef, skippedColumns } from '../utils';

export const defaultColumns = (rows: any) => {
  if (!rows) return [];
  const resultWithTypes = createResultWithTypes(rows);

  return Object.entries(resultWithTypes)
    .map(([columnLabel, columnType]) => {
      if (skippedColumns.includes(columnLabel)) return;
      return createSingleGridColDef(columnLabel, columnType);
    })
    .filter((x) => x !== undefined) as GridColDef[];
};
