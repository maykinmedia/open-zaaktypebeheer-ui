import { Alert, Button, Skeleton, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router';
import { useAsync } from 'react-use';
import { InformatieObjectT, ZaaktypeResolvedT } from '../types/types';
import { spacings } from '../components/DesignSystem/DesignSystem';
import { get } from '../api/api';
import BulkEditor from '../components/BulkEditor/BulkEditor';

const ZaaktypeEditView = () => {
  const params = useParams();
  const { loading, value, error } = useAsync(async () => {
    const zaaktype: ZaaktypeResolvedT = await get(`catalogi/zaaktypen/${params.zaaktypeUuid}/`);
    const informatieobjecttypen: InformatieObjectT[] = await get(
      `catalogi/informatieobjecttypen/?catalogus=${zaaktype.catalogus}&status=alles`
    );
    return { zaaktype, informatieobjecttypen };
  }, []);

  // Should be improved
  if (error) return <Alert severity="error">{error.message}</Alert>;

  return (
    <Stack direction={'row'} flexWrap={'wrap'} width={'100%'} spacing={spacings.xlarge} useFlexGap>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        width={'100%'}
        spacing={spacings.large}
        useFlexGap
      >
        <Typography variant="h1">
          {loading ? <Skeleton variant="text" width={200} /> : value?.zaaktype?.omschrijving}
        </Typography>
        <Stack direction={'row'} spacing={spacings.small}>
          <Button variant="outlined">Annuleren</Button>
          <Button variant="contained" disableElevation>
            Opslaan
          </Button>
        </Stack>
        <Stack spacing={spacings.small} width="100%">
          <Typography variant="h2">
            {loading ? <Skeleton variant="text" width={320} /> : 'Koppel informatieobjecttypen'}
          </Typography>
          <Typography variant="body2">
            {loading ? (
              <Skeleton variant="text" width={340} />
            ) : (
              'Hier kunt u de gekoppelde informatieobjecttypen wijzigen.'
            )}
          </Typography>
          <BulkEditor
            loading={loading}
            zaaktype={value?.zaaktype!}
            informatieobjecttypen={value?.informatieobjecttypen!}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ZaaktypeEditView;
