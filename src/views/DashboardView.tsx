import { Alert, Skeleton, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import Search from '../components/Search/Search';
import Card from '../components/Card/Card';
import ToggleButton from '../components/ToggleButton/ToggleButton';
import DataGrid from '../components/DataGrid/DataGrid';
import { attributeOnQueryFilter } from '../utils/filter';
import { Query, DataVisualLayout, ZaaktypeT } from '../types/types';
import { spacing } from '../components/DesignSystem/DesignSystem';
import { useAsync } from 'react-use';
import { get } from '../api/api';

const DashboardView = () => {
  const [query, setQuery] = useState<Query>('');
  const [dataVisualLayout, setDataVisualLayout] = useState<DataVisualLayout>('blocks');

  const { loading, value, error } = useAsync(async () => {
    const results: ZaaktypeT[] = await get(`catalogi/zaaktypen/`);
    return { results };
  }, []);

  const filteredResults = attributeOnQueryFilter(query, value?.results!, 'omschrijving');
  const zaaktypen: ZaaktypeT[] = !filteredResults ? new Array(10).fill({}) : filteredResults; // Used to show skeleton loading

  return (
    <Stack component={'article'} spacing={spacing} useFlexGap>
      <Typography variant="h4" component="h1">
        {loading ? <Skeleton width={160} /> : 'Dashboard'}
      </Typography>
      <Stack
        width={'100%'}
        direction={'row'}
        flexWrap={'wrap'}
        spacing={spacing}
        useFlexGap
        position={'sticky'}
        top={64}
        zIndex={1}
        sx={{
          backgroundColor: 'white',
        }}
      >
        <Search label="Zoek naar zaaktypen" query={query} setQuery={setQuery} />
        <ToggleButton
          dataVisualLayout={dataVisualLayout}
          setDataVisualLayout={setDataVisualLayout}
        />
      </Stack>
      {error ? (
        <Alert severity="error">{error.message}</Alert>
      ) : (
        <>
          <Typography variant="h6" component={'h2'}>
            {loading ? <Skeleton width={130} /> : `${zaaktypen.length} Zaaktypen`}
          </Typography>
          {dataVisualLayout === 'datagrid' && <DataGrid data={zaaktypen} loading={loading} />}
          {dataVisualLayout === 'blocks' && (
            <Stack direction={'row'} flexWrap={'wrap'} width={'100%'} spacing={spacing} useFlexGap>
              {zaaktypen.map((zaaktype: ZaaktypeT, i: number) => (
                <Card key={i} zaaktype={zaaktype} loading={loading} />
              ))}
            </Stack>
          )}
        </>
      )}
    </Stack>
  );
};

export default DashboardView;
