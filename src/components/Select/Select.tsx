import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { outlinedInputStyling } from '../DesignSystem/DesignSystem';
import { arrayOfObjectsSort } from '../../utils/sort';

/** Props for the select component */
interface SelectProps extends MuiSelectProps {
  /**
   * Label for the select
   * @default 'Selecteer een optie'
   */
  label: string;
  /**
   * All option label for the select
   * @default 'Alles'
   */
  defaultValue?: string;
  /**
   * Selected value
   */
  selectedValue: {
    label: string;
    value: string;
  };
  /**
   * Structure of select data
   */
  structure: {
    /** Array of objects */
    data: any[];
    /** Key to index label on data object */
    labelKey: string;
    /** Key to index value on data object */
    valueKey: string;
  };
  /**
   * Maximum height of the select menu
   * @default 340
   */
  maxHeight?: number;
  /**
   * Minimum width of the select menu
   * @default 320
   */
  maxWidth?: number;
  /**
   * Sort options
   * @default 'asc'
   */
  optionSort?: 'asc' | 'desc';
}

const Select = ({
  label = 'Selecteer optie',
  defaultValue = 'Alles',
  optionSort = 'asc',
  selectedValue,
  structure,
  maxHeight = 340,
  maxWidth = 320,
  ...rest
}: SelectProps) => {
  return (
    <FormControl sx={{ minWidth: maxWidth, ...rest.sx }}>
      <InputLabel htmlFor="search" aria-label={label}>
        {label}
      </InputLabel>
      <MuiSelect
        {...rest}
        label={label}
        IconComponent={ExpandMore}
        value={selectedValue.value}
        autoWidth
        sx={{
          ...outlinedInputStyling,
        }}
        MenuProps={{
          PaperProps: {
            variant: 'outlined',
            elevation: 0,
            sx: {
              mt: 1,
              width: '100%',
              maxHeight,
              maxWidth,
            },
          },
        }}
      >
        <MenuItem value={'all'}>{defaultValue}</MenuItem>
        <Divider />
        {!structure.data ? (
          <MenuItem value={selectedValue.value}>{selectedValue.label}</MenuItem>
        ) : (
          arrayOfObjectsSort(structure?.data, structure.labelKey, optionSort)?.map(
            (item: any, i: any) => {
              return (
                <MenuItem key={i} value={item[structure.valueKey]}>
                  {item[structure.labelKey]}
                </MenuItem>
              );
            }
          )
        )}
      </MuiSelect>
    </FormControl>
  );
};

export default Select;
