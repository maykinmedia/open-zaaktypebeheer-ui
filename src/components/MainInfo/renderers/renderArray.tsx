import { RendererT } from '../../../types/types';
import { isValue } from '../../../utils/is';
import ValueRenderer from '../valueRenderer';

const RenderArray = ({ label, value }: RendererT) => {
  return value.map((item: any, i: number) => (
    <ValueRenderer key={i} label={label} value={item} type={isValue(item)} />
  ));
};

export default RenderArray;
