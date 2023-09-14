import { isValue } from '../../../utils/is';
import ValueRenderer from './valueRenderer';

interface RenderArrayProps {
  label?: string;
  value: any[];
}

const RenderArray = ({ label, value }: RenderArrayProps) => {
  return value.map((item: any, i: number) => (
    <ValueRenderer key={i} label={label} value={item} type={isValue(item)} />
  ));
};

export default RenderArray;
