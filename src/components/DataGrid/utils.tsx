import { GridActionsCellItem, GridColDef, GridLocaleText } from '@mui/x-data-grid';
import {
  CreateGridColDefFunction,
  CreateSingleGridColDefFunction,
  InformatieObjectT,
  ZaaktypeT,
} from '../../types/types';
import text from '../../utils/text';
import array from '../../utils/array';
import extract from '../../utils/extract';
import { ArrowForward } from '@mui/icons-material';
import { Tooltip } from '@mui/material';

/**
 * Default filters for the DataGrid
 * These filters can't be set to hidden
 */
export const defaultFilters = ['omschrijving', 'identificatie'];

/**
 * Locale text for the DataGrid
 * @see https://mui.com/components/data-grid/localization/
 */

export const dataGridLocaleText: Partial<GridLocaleText> = {
  toolbarDensity: 'Rijhoogte',
  toolbarDensityCompact: 'Compact',
  toolbarDensityStandard: 'Standaard',
  toolbarDensityComfortable: 'Comfortabel',
  toolbarColumns: 'Kolommen',
  toolbarColumnsLabel: 'Kolommen',
  columnsPanelTextFieldLabel: 'Zoek kolommen',
  columnsPanelTextFieldPlaceholder: 'Titel kolom',
  columnsPanelDragIconLabel: 'Kolom verplaatsen',
  columnsPanelHideAllButton: 'Alles verbergen',
  columnsPanelShowAllButton: 'Alles tonen',
};

/**
 * Add an id to each row
 * @param rows Zaaktypen or Attributen
 * @returns rows with id
 */
export const rowsWithId = (rows: ZaaktypeT[] | InformatieObjectT[]) =>
  rows.map((row, i) => {
    return { ...row, id: row?.url ? extract.uuid(row.url) : i };
  });

/**
 * Create a column definition for the DataGrid, based on the attributes of the results.
 * @param key Property of zaaktype or informatieobject
 * @param value Value of zaaktype or informatieobject key
 * @returns column definition
 */
export const createSingleGridColDef: CreateSingleGridColDefFunction = (key, value) => {
  if (key === 'omschrijving') return undefined;
  if (typeof value === 'object') return undefined;
  let type = typeof value;
  return {
    field: key,
    headerName: text.decamelize(key),
    description: text.decamelize(key),
    type,
    minWidth: type == 'boolean' ? 100 : 220,
    flex: type == 'boolean' ? 0 : 1,
    hideable: !defaultFilters.includes(key),
  };
};

/**
 * Create a column definition for the DataGrid, based on the attributes of the results.
 * @param data Zaaktypen or Attributen
 * @param handleNavigate function for navigating to a zaaktype
 * @returns column definition
 * @see https://mui.com/components/data-grid/columns/
 */

export const createGridColDef: CreateGridColDefFunction = (data, handleNavigate) => {
  const perfectResult = createPerfectResult(data);
  return [
    {
      field: 'Link',
      type: 'actions',
      description: 'Link naar zaaktype',
      width: 40,
      hideable: false,
      getActions: (params) => [
        <Tooltip title={`Open ${params.row.omschrijving}`}>
          <GridActionsCellItem
            color="primary"
            icon={<ArrowForward />}
            label={`Open ${params.row.omschrijving}`}
            onClick={handleNavigate(params)}
          />
        </Tooltip>,
      ],
    },
    {
      field: 'omschrijving',
      headerName: 'Omschrijving',
      description: 'omschrijving',
      type: 'string',
      width: 220,
      minWidth: 220,
      flex: 2,
      hideable: !defaultFilters.includes('omschrijving'),
    },
    ...(Object.entries(perfectResult)
      .map(([key, value]) =>
        createSingleGridColDef(key as keyof ZaaktypeT | keyof InformatieObjectT, value)
      )
      .filter((x) => x !== undefined) as GridColDef[]),
  ];
};

/**
 * Create a columnVisibilityModel, based on the attributes of the results.
 * Used for creating the column types for the DataGrid.
 * @param data Zaaktypen or Attributen
 * @returns columnVisibilityModel
 */

export const inititialColumnVisibilityModel = (data: ZaaktypeT[] | InformatieObjectT[]) => {
  const columnVisibilityModel: any = {};
  array
    .attributesFromResults(data!)
    .filter((result) => (columnVisibilityModel[result] = defaultFilters.includes(result)));

  return columnVisibilityModel;
};

/**
 * Create a perfect result, based on the attributes of the results.
 * Used for creating the column types for the DataGrid.
 * @param data Zaaktypen or Attributen
 * @returns perfect result
 */
export const createPerfectResult = (data: ZaaktypeT[] | InformatieObjectT[]) => {
  const attributesFromResults = array.attributesFromResults(data);

  let perfectResult: any = {};

  for (const attribute of attributesFromResults) {
    for (const obj of data) {
      perfectResult[attribute] = obj[attribute as keyof typeof obj];
    }
  }
  return perfectResult;
};
