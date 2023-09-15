import { Alert, AlertTitle, Box, Button, Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import Search from '../components/Search/Search';
import Card from '../components/Card/Card';
import ToggleButton from '../components/ToggleButton/ToggleButton';
import DataGrid from '../components/DataGrid/DataGrid';
import { attributeOnQueryFilter } from '../utils/filter';
import {
  Query,
  DataVisualLayout,
  ZaaktypeT,
  ColumnTypes,
  CatalogusT,
  SavedCatalogusT,
} from '../types/types';
import { spacings } from '../components/DesignSystem/DesignSystem';
import { useAsync } from 'react-use';
import { get } from '../api/api';
import useDataGrid from '../hooks/useDatagrid';
import Select from '../components/Select/Select';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';
import { uuidExtract } from '../utils/extract';

const columnNames: ColumnTypes[] = ['link', 'title', 'default'];

const DashboardView = () => {
  const currentCatalogi = getLocalStorage('catalogus');
  const [catalogus, setCatalogus] = useState<SavedCatalogusT>(currentCatalogi!);
  const [catalogussen, setCatalogussen] = useState<CatalogusT[]>(undefined!);
  const [query, setQuery] = useState<Query>('');
  const [dataVisualLayout, setDataVisualLayout] = useState<DataVisualLayout>('blocks');

  const { loading, value, error } = useAsync(async () => {
    let endpoint = 'catalogi/zaaktypen/?status=alles';
    if (!catalogussen) setCatalogussen(await get('catalogi/catalogussen/'));
    if (!catalogus) return { zaaktypen: undefined, catalogussen };
    if (catalogus.value !== 'all') endpoint += `&catalogus=${catalogus.value}`;
    const zaaktypen: ZaaktypeT[] = await get(endpoint);

    return { zaaktypen, catalogussen };
  }, [catalogus]);

  // Used to show the initial loading skeleton
  const zaaktypen = value?.zaaktypen
    ? attributeOnQueryFilter(query, value?.zaaktypen!, 'omschrijving')
    : catalogussen
    ? []
    : new Array(10).fill({});

  const initialData = useMemo(
    () => ({
      selection: [],
      rows: zaaktypen?.map((zaaktype, i) => ({
        ...zaaktype,
        id: zaaktype.url ? uuidExtract(zaaktype.url) : i,
      })),
    }),
    [zaaktypen]
  );

  const { gridHandlers, gridActionHandlers, ...gridData } = useDataGrid(
    initialData,
    loading,
    columnNames
  );

  const changeCatalogi = (_e: any, child: any) => {
    const value = {
      value: child.props.value,
      label: child.props.children,
    };
    setLocalStorage('catalogus', value);
    setCatalogus(value);
  };

  return (
    <Stack component={'article'} spacing={spacings.large} useFlexGap>
      <Box width={'100%'}>
        <Typography variant="h1">Dashboard</Typography>
      </Box>
      <Stack
        width={'100%'}
        direction={'row'}
        flexWrap={'wrap'}
        spacing={spacings.medium}
        useFlexGap
        position={'sticky'}
        top={64}
        zIndex={1}
        sx={{
          pb: 2,
          backgroundColor: 'white',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Search label="Zoek naar zaaktypen" query={query} setQuery={setQuery} />
        <ToggleButton
          dataVisualLayout={dataVisualLayout}
          setDataVisualLayout={setDataVisualLayout}
        />
        <Select
          sx={{
            ml: { md: 'auto' },
          }}
          selectedValue={catalogus}
          onChange={changeCatalogi}
          disabled={loading}
          structure={{
            labelKey: 'domein',
            valueKey: 'url',
            data: catalogussen,
          }}
          label={'Selecteer catalogus'}
          defaultValue={{ label: 'Alle catalogussen', value: 'all' }}
          optionSort={'asc'}
        />

        <Box width={'100%'}>
          <Typography variant={'h2'}>
            Zaaktypen {!error && !loading && catalogussen && `(${zaaktypen.length})`}
          </Typography>
        </Box>
      </Stack>
      {error ? (
        <Alert
          severity="error"
          action={
            <Button
              size="small"
              color="error"
              onClick={() => window.location.reload()}
              sx={{ alignSelf: 'flex-end' }}
            >
              Herlaad pagina
            </Button>
          }
        >
          <AlertTitle>{error.message}</AlertTitle>
          Er is een fout opgetreden bij het ophalen van de zaaktypen. Probeer het opnieuw.
        </Alert>
      ) : catalogus ? (
        <>
          {dataVisualLayout === 'datagrid' && (
            <DataGrid height={610} {...gridHandlers} {...gridData} loading={loading} />
          )}
          {dataVisualLayout === 'blocks' && (
            <Stack
              direction={'row'}
              flexWrap={'wrap'}
              width={'100%'}
              spacing={spacings.medium}
              useFlexGap
            >
              {zaaktypen.map((zaaktype: ZaaktypeT, i: number) => (
                <Card key={i} zaaktype={zaaktype} loading={loading} />
              ))}
            </Stack>
          )}
        </>
      ) : (
        <Alert severity="info">Selecteer eerst een catalogus</Alert>
      )}
    </Stack>
  );
};

export default DashboardView;
