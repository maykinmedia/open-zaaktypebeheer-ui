/**
 * Custom types are defined here.
 * They might need to be updated following the zaaktypebeheer-api.
 */
import { GridColDef } from '@mui/x-data-grid';
import { Dispatch, SetStateAction } from 'react';
import { LinkProps, NavigateFunction } from 'react-router-dom';
import { AuthContextType } from '../components/Auth/Auth';

//-----------------------//
//    Data Structures    //
//-----------------------//

export type ZaaktypeT = {
  url: string;
  identificatie?: string;
  omschrijving: string;
  omschrijvingGeneriek?: string;
  vertrouwelijkheidaanduiding:
    | 'openbaar'
    | 'beperkt_openbaar'
    | 'intern'
    | 'zaakvertrouwelijk'
    | 'vertrouwelijk'
    | 'confidentieel'
    | 'geheim'
    | 'zeer_geheim';
  doel: string;
  aanleiding: string;
  toelichting?: string;
  indicatieInternOfExtern: 'intern' | 'extern' | 'uitgaand';
  handelingInitiator: string;
  onderwerp: string;
  handelingBehandelaar: string;
  doorlooptijd: string;
  servicenorm?: string | null;
  opschortingEnAanhoudingMogelijk: boolean;
  verlengingMogelijk: boolean;
  verlengingstermijn?: string;
  trefwoorden?: string[];
  publicatieIndicatie: boolean;
  publicatietekst?: string;
  verantwoordingsrelatie?: string[];
  productenOfDiensten: string[];
  selectielijstProcestype?: string;
  referentieproces: {
    naam: string;
    link?: string;
  };
  catalogus: string;
  statustypen?: string[];
  resultaattypen?: string[];

  eigenschappen?: string[];
  informatieobjecttypen?: string[];

  roltypen?: string[];
  besluittypen: string[];
  deelzaaktypen?: string[];

  gerelateerdeZaaktypen?: {
    zaaktype: string;
    aardRelatie: 'vervolg' | 'bijdrage' | 'onderwerp';
    toelichting?: string;
  }[];
  beginGeldigheid: string;
  eindeGeldigheid?: string;
  versiedatum: string;
  concept?: boolean;
};

export type InformatieObjectT = {
  url?: string;
  catalogus: string;
  omschrijving: string;
  zaaktype: string;
  vertrouwelijkheidaanduiding: string;
  beginGeldigheid: string;
  eindeGeldigheid: string;
  concept: boolean;
};

export type ZaaktypeInformatieRelatieT = {
  url?: string;
  zaaktype: string;
  informatieobjecttype: string;
  volgnummer: number;
  richting: 'inkomend' | 'uitgaand' | 'definitief';
  statustype?: string | null;
};

//-----------------------//
//    Use-state Types    //
//-----------------------//
export type Query = string;
export type SetQuery = Dispatch<SetStateAction<Query>>;

export type DataVisualLayout = 'blocks' | 'datagrid';
export type SetDataVisualLayout = Dispatch<SetStateAction<DataVisualLayout>>;

//----------------------//
//    ComponentProps    //
//----------------------//

/** Props for Search component  */
export type SearchProps = {
  query: Query;
  setQuery: SetQuery;
  label: string;
  fullWidth?: boolean;
};

/** Props for Breadcrumbs component */
export interface StyledRoutedLinkProps extends LinkProps {
  to: string;
  replace?: boolean;
}

/** Props for ToggleButton component  */
export type ToggleButtonProps = {
  dataVisualLayout: DataVisualLayout;
  setDataVisualLayout: SetDataVisualLayout;
};

/** Props for Card component  */
export type CardProps = {
  zaaktype: ZaaktypeT;
  loading?: boolean;
};

/** Props for DataGrid component  */
export type DataGridProps = {
  data: ZaaktypeT[] | InformatieObjectT[];
  loading?: boolean;
};

//-----------------//
//    Functions    //
//-----------------//

/**  Create single column definition function  */
export type CreateSingleGridColDefFunction = (
  columnLabel: keyof ZaaktypeT | keyof InformatieObjectT,
  columnType: any
) => GridColDef | undefined;

/**  Create multiple column definitions function  */
export type CreateGridColDefFunction = (
  data: ZaaktypeT[] | InformatieObjectT[],
  handleClick: (params: any) => VoidFunction,
  loading?: boolean
) => GridColDef[];

//----------------//
//    Response    //
//----------------//
export type PaginatedResponse<T> = {
  count: number;
  previous: string | null;
  next: string | null;
  results: T[];
};

export type ZaaktypenResponse = PaginatedResponse<ZaaktypeT>;
export type InformatieObjectenResposonse = PaginatedResponse<InformatieObjectT>;

// Types from [#12], Fixes merge conflicts
// Fixing this in next PR :(
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

// Login/Logout types and interfaces
export interface UserDataT {
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}
