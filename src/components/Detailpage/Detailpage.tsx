import { Skeleton, Stack, Typography } from '@mui/material';
import { spacings } from '../DesignSystem/DesignSystem';
import { ColumnTypes, ZaaktypeResolvedT } from '../../types/types';
import DataGrid from '../DataGrid/DataGrid';
import Tabs from '../Tabs/Tabs';
import DetailpageActions from './Actions';
import { getInitialData } from '../DataGrid/utils';
import useDataGrid from '../../hooks/useDatagrid';
import { algmeenContentStructure } from './utils';
import Content from '../Content/Content';

const columnNames: ColumnTypes[] = ['title', 'bulkEditor', 'default'];

export type DetailpageProps = {
  loading: boolean;
  zaaktype?: ZaaktypeResolvedT;
};

const Detailpage = ({ loading, zaaktype }: DetailpageProps) => {
  const initialData = getInitialData(zaaktype);
  const { gridHandlers, ...gridData } = useDataGrid(initialData, loading, columnNames);
  const algemeenStructure = algmeenContentStructure(zaaktype);

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
        {loading ? <Skeleton variant="text" width={200} /> : zaaktype?.omschrijving}
      </Typography>
      <DetailpageActions concept={zaaktype?.concept} />

      <Tabs tabNames={['Algemeen', 'Informatieobjecttypen']}>
        {/* Tab One */}
        <Content loading={loading} contentStructure={algemeenStructure} />
        {/* Tab Two */}
        <Stack spacing={spacings.medium}>
          <Typography variant="h2">Informatieobjecttypen</Typography>
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
