import { NavigateFunction } from 'react-router-dom';
import { Dispatch, SetStateAction } from 'react';

export interface SiteTreeT {
  siteTreeOptions: SiteTreeOptions;
}

export type SiteTreeOptions = SiteTreeOptionT[];

export interface SiteTreeOptionT {
  label: string;
  Icon?: JSX.Element;
  onClick?: () => void;
}

export interface NavigationT extends SiteTreeT {
  navigate: NavigateFunction;
}

export interface DrawerT extends NavigationT {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface LogoT
  extends Omit<
    React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
    'src'
  > {}
