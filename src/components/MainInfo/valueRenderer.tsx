import { RendererFunctionT } from '../../types/types';
import RenderArray from './renderers/renderArray';
import RenderBoolean from './renderers/renderBoolean';
import RenderString from './renderers/renderString';
import RenderUrl from './renderers/renderUrl';

const rendererMap = {
  url: RenderUrl,
  boolean: RenderBoolean,
  string: RenderString,
  array: RenderArray,
};

const ValueRenderer = (props: RendererFunctionT) => {
  const Renderer = rendererMap[props.type];
  return <Renderer label={props?.label} value={props.value} />;
};

export default ValueRenderer;
