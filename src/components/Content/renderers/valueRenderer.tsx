import RenderArray from './renderArray';
import RenderBoolean from './renderBoolean';
import RenderString from './renderString';
import RenderUrl from './renderUrl';
import RenderObject from './renderObject';

const rendererMap = {
  url: RenderUrl,
  boolean: RenderBoolean,
  string: RenderString,
  array: RenderArray,
  object: RenderObject,
};

interface ValueRendererProps {
  type: 'url' | 'boolean' | 'string' | 'array' | 'object';
  label?: string;
  value: any;
}

const ValueRenderer = (props: ValueRendererProps) => {
  const Renderer = rendererMap[props.type];
  return <Renderer label={props?.label} value={props.value} />;
};

export default ValueRenderer;
