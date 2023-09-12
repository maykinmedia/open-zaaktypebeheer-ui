import { Skeleton, Stack, Typography } from '@mui/material';
import { spacings } from '../DesignSystem/DesignSystem';
import { DetailpageProps, ColumnTypes } from '../../types/types';
import DataGrid from '../DataGrid/DataGrid';
import Tabs from '../Tabs/Tabs';
import DetailpageActions from './Actions';
import MainInfo from '../MainInfo/MainInfo';
import { getInitialData } from '../DataGrid/utils';
import useDataGrid from '../../hooks/useDatagrid';

const Detailpage = ({ zaaktype, loading }: DetailpageProps) => {
  const columnNames: ColumnTypes[] = ['title', 'bulkEditor', 'default'];
  const initialData = getInitialData(zaaktype);
  const { gridHandlers, ...gridData } = useDataGrid(initialData, loading, columnNames);

  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      flexWrap={'wrap'}
      width={'100%'}
      spacing={spacings.large}
      useFlexGap
    >
      <Typography variant="h1">
        {loading ? <Skeleton variant="text" width={320} /> : zaaktype?.omschrijving}
      </Typography>
      <DetailpageActions concept={zaaktype?.concept} />

      <Tabs tabNames={['Algemeen', 'Informatieobjecttypen']}>
        {/* Tab One */}
        <MainInfo zaaktype={zaaktype} loading={loading} />
        {/* Tab Two */}
        <Stack spacing={spacings.medium}>
          <Typography variant="h2">Informatieobjecttypen</Typography>
          {/* <Search query={query} setQuery={setQuery} label="Zoek op informatieobjecttypen" /> */}
          <DataGrid
            // layout
            height={500}
            // state
            loading={loading}
            // data
            {...gridData}
            // interactive settings
            isCellEditable={() => false}
            disableRowSelectionOnClick
            showQuickFilter
            // interactive handlers
            {...gridHandlers}
          />
        </Stack>
      </Tabs>
    </Stack>
  );
};

export default Detailpage;
