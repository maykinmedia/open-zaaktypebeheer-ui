import { isValue } from '../../../utils/is';
import ValueRenderer from './valueRenderer';

interface RenderObjectProps {
  label?: string;
  value: any;
}

const RenderObject = ({ value }: RenderObjectProps) => {
  const keys = Object.keys(value);

  return keys.map((key, i) => {
    return <ValueRenderer key={i} label={key} value={value[key]} type={isValue(value[key])} />;
  });
};
export default RenderObject;
