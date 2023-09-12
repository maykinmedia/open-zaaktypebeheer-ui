import { Skeleton, Stack, Typography } from '@mui/material';
import { decamelizeText, widthText } from '../../utils/text';
import { dynamicWidth } from '../DesignSystem/DesignSystem';
import ValueRenderer from '../MainInfo/valueRenderer';
import { MainInfoColumnProps } from '../../types/types';
import { isEmpty, isValue } from '../../utils/is';

const MainInfoColumn = (props: MainInfoColumnProps) => {
  const { value, loading, fullWidth } = props;
  const label = decamelizeText(props.label);
  if (!loading && isEmpty(value)) return;

  return (
    <Stack spacing={'4px'} width={'100%'} maxWidth={fullWidth ? '100%' : dynamicWidth(2, 32)}>
      <Typography variant="h3">
        {loading ? <Skeleton width={widthText(label, 5)} /> : label}
      </Typography>
      {loading ? (
        <>
          <Skeleton />
          {fullWidth && <Skeleton width={'90%'} />}
        </>
      ) : (
        <ValueRenderer label={label} value={value} type={isValue(value)} />
      )}
    </Stack>
  );
};

export default MainInfoColumn;
