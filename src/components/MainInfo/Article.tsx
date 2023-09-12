import { Box, Skeleton, Stack, Typography } from '@mui/material';
import { spacings } from '../DesignSystem/DesignSystem';
import { widthText } from '../../utils/text';
import { memo } from 'react';
import MainInfoColumn from './Column';
import { MainInfoArticleProps } from '../../types/types';

const MainInfoArticle = (props: MainInfoArticleProps) => {
  const { label, fields, loading } = props;

  return (
    <Box component={'article'} display={'flex'} flexDirection={'column'} gap={spacings.large}>
      <Typography variant="h2">
        {!loading ? label : <Skeleton width={widthText(label, 10)} />}
      </Typography>

      <Stack flexWrap={'wrap'} spacing={spacings.large} useFlexGap direction={'row'}>
        {fields.map((field, i) => (
          <MainInfoColumn key={i} loading={loading} {...field} />
        ))}
      </Stack>
    </Box>
  );
};

export default memo(MainInfoArticle);
