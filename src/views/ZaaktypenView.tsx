import { Alert, Stack } from '@mui/material';
import { useParams } from 'react-router';
import { useAsync } from 'react-use';
import { ZaaktypeResolvedT } from '../types/types';
import { get } from '../api/api';
import Detailpage from '../components/Detailpage/Detailpage';
import { spacings } from '../components/DesignSystem/DesignSystem';

const ZaaktypeView = () => {
  const params = useParams();

  const { loading, value, error } = useAsync(async () => {
    const zaaktype: ZaaktypeResolvedT = await get(`catalogi/zaaktypen/${params.zaaktypeUuid}/`);
    return { zaaktype };
  }, []);

  // Should be improved
  if (error) return <Alert severity="error">{error.message}</Alert>;

  return (
    <Stack direction={'row'} flexWrap={'wrap'} width={'100%'} spacing={spacings.medium} useFlexGap>
      {/* Add Breadcrumbs once merged */}
      <Detailpage zaaktype={value?.zaaktype} loading={loading} />
    </Stack>
  );
};

export default ZaaktypeView;
