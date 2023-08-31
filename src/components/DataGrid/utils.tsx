import {
  GridActionsCellItem,
  GridColDef,
  GridColumnHeaderTitle,
  GridColumnVisibilityModel,
  GridLocaleText,
} from '@mui/x-data-grid';
import {
  CreateGridColDefFunction,
  CreateSingleGridColDefFunction,
  InformatieObjectT,
  ZaaktypeT,
} from '../../types/types';
import { decamelizeText } from '../../utils/text';
import { attributesFromDataArray } from '../../utils/array';
import { uuidExtract } from '../../utils/extract';
import { ArrowForward } from '@mui/icons-material';
import { Skeleton, Tooltip } from '@mui/material';

/**
 * Default columns for the DataGrid
 * These columns can't be set to hidden
 */
export const defaultColumns = ['omschrijving', 'identificatie'];

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
 * Add an id to each row of the DataGrid
 * The id is used to index the row and to navigate to the zaaktype
 * If there is no url (loading state) the index of the row is used.
 * @param rows Zaaktypen or Attributen
 * @returns rows with id
 */
export const rowsWithId = (rows: ZaaktypeT[] | InformatieObjectT[]) =>
  rows.map((row, i) => {
    return { ...row, id: row?.url ? uuidExtract(row.url) : i };
  });

/**
 * Create a columnVisibilityModel, based on the attributes of the results.
 * Used for creating the column types for the DataGrid.
 * @param data Zaaktypen or Attributen
 * @returns GridColumnVisibilityModel
 */
export const columnVisibilityModel = (data: ZaaktypeT[] | InformatieObjectT[]) => {
  const columnVisibilityModel: GridColumnVisibilityModel = {};
  const attributes = attributesFromDataArray(data);

  for (const attribute of attributes) {
    columnVisibilityModel[attribute] = defaultColumns.includes(attribute);
  }
  return columnVisibilityModel;
};

/**
 * Create an object with the attributes of the results and their types.
 * Used for creating the column types for the DataGrid.
 * @param data Zaaktypen or Attributen
 * @returns Object with attributes and their types
 */
export const createResultWithTypes = (data: ZaaktypeT[] | InformatieObjectT[]) => {
  const resultWithTypes: any = {};
  const attributes = attributesFromDataArray(data);

  for (const attribute of attributes) {
    for (const obj of data) {
      resultWithTypes[attribute] = typeof obj[attribute as keyof typeof obj];
    }
  }
  return resultWithTypes;
};

/**
 * Create a column definition for the DataGrid, based on the attributes of the results.
 * @param key Property of zaaktype or informatieobject
 * @param value Value of zaaktype or informatieobject key
 * @returns column definition
 */
export const createSingleGridColDef: CreateSingleGridColDefFunction = (columnLabel, columnType) => {
  if (defaultColumns.includes(columnLabel)) return undefined;
  if (columnType === 'object') return undefined;

  return {
    field: columnLabel,
    headerName: decamelizeText(columnLabel),
    description: decamelizeText(columnLabel),
    type: columnType,
    minWidth: columnType == 'boolean' ? 100 : 220,
    flex: columnType == 'boolean' ? 0 : 1,
    hideable: !defaultColumns.includes(columnLabel),
  };
};

/**
 * Create a column definition for the DataGrid, based on the attributes of the results.
 * @param data Zaaktypen or Attributen
 * @param handleNavigate function for navigating to a zaaktype
 * @returns column definition
 * @see https://mui.com/components/data-grid/columns/
 */
export const createGridColDef: CreateGridColDefFunction = (data, handleClick, loading) => {
  const resultWithTypes = createResultWithTypes(data);

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
            onClick={handleClick(params)}
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
      hideable: !defaultColumns.includes('omschrijving'),
      renderHeader: () =>
        loading ? (
          <Skeleton variant="text" width={80} height={26} />
        ) : (
          <GridColumnHeaderTitle
            label="Omschrijving"
            columnWidth={220}
            description="Omschrijving"
          />
        ),
    },
    {
      field: 'identificatie',
      headerName: 'Identificatie',
      description: 'identificatie',
      type: 'string',
      minWidth: 220,
      flex: 1,
      hideable: !defaultColumns.includes('identificatie'),
      renderHeader: () =>
        loading ? (
          <Skeleton variant="text" width={80} height={26} />
        ) : (
          <GridColumnHeaderTitle
            label="Identificatie"
            columnWidth={220}
            description="Identificatie"
          />
        ),
    },
    ...(Object.entries(resultWithTypes)
      .map(([columnLabel, columnType]) =>
        createSingleGridColDef(columnLabel as keyof ZaaktypeT | keyof InformatieObjectT, columnType)
      )
      .filter((x) => x !== undefined) as GridColDef[]),
  ];
};
