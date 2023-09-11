import { GridColDef, GridColumnHeaderTitle } from '@mui/x-data-grid';
import { getStatusTypeOptions, richtingOptions } from '../utils';
import { ucFirstText, widthText } from '../../../utils/text';
import { Skeleton } from '@mui/material';

export const bulkEditorColumns = (loading: boolean, zaaktype?: any) => {
  const statusTypeMap = getStatusTypeOptions(zaaktype);

  const columns: GridColDef[] = [
    {
      field: 'richting',
      type: 'singleSelect',
      valueOptions: richtingOptions,
      editable: true,
      width: 110,
    },
    {
      field: 'statustype',
      type: 'singleSelect',
      valueOptions: ['Geen statustype', ...statusTypeMap],
      editable: true,
      width: 180,
      valueFormatter: (params) => {
        if (params.api.isRowSelected(params.id ? params.id : 0))
          return params.value || 'Geen statustype';
      },
    },
    {
      field: 'volgnummer',
      type: 'number',
      width: 120,
    },
  ];

  const columnFormat: GridColDef[] = columns.map((column) => {
    return {
      ...column,
      description: ucFirstText(column.field),
      headerName: ucFirstText(column.field),
      sortable: false,
      hideable: false,
      renderHeader: () =>
        loading ? (
          <Skeleton variant="text" width={widthText(column.field, 5)} height={26} />
        ) : (
          <GridColumnHeaderTitle
            label={ucFirstText(column.field)}
            columnWidth={column.width!}
            description={ucFirstText(column.field)}
          />
        ),
    };
  });

  return columnFormat;
};
