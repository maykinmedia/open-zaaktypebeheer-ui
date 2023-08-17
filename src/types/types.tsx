import { NavigateFunction } from 'react-router-dom';
import { AuthContextType } from '../components/Auth/Auth';

export type GetSiteTreeFunction = (
  navigate: NavigateFunction,
  auth: AuthContextType
) => SiteTreeOptions;

export type SiteTreeOptions = SiteTreeOptionT[];

export interface SiteTreeOptionT {
  label: string;
  Icon?: JSX.Element;
  onClick?: () => void;
}

export interface DrawerT {
  open: boolean;
  toggleDrawer: ToggleDrawerFunction;
}

export type ToggleDrawerFunction = (newState: boolean) => (event: any) => void;

export type DrawerListT = {
  siteTreeOptions: SiteTreeOptions;
};

export interface LogoT
  extends Omit<
    React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
    'src'
  > {}
