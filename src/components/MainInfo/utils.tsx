import { GetAvailibleDataFunction, GetMainInfoStructureFunction } from '../../types/types';
import { uuidExtract } from '../../utils/extract';
import { currentMargin, headerHeight, tabsHeight } from '../DesignSystem/DesignSystem';

/** @todo fixme, i want to have responsive calculated sizes */
export const scrollMarginTop = headerHeight + tabsHeight + currentMargin;

export const getAvailibleData: GetAvailibleDataFunction = (mainInfoStructure) => {
  return mainInfoStructure.map((article) => {
    return article.fields
      ?.map((column) => {
        if (typeof column.value === 'boolean') return true;
        return !!column.value;
      })
      .some((value: any) => value !== false);
  });
};

export const getMainInfoStructure: GetMainInfoStructureFunction = (zaaktype) => {
  return [
    {
      label: 'Algemeen',
      slug: 'algemeen',
      fields: [
        {
          label: 'uuid',
          value: zaaktype ? uuidExtract(zaaktype?.url) : undefined,
          fullWidth: false,
        },
        {
          label: 'identificatie',
          value: zaaktype?.identificatie,
          fullWidth: false,
        },
        {
          label: 'omschrijving',
          value: zaaktype?.omschrijving,
          fullWidth: false,
        },
        {
          label: 'omschrijvingGeneriek',
          value: zaaktype?.omschrijvingGeneriek,
          fullWidth: false,
        },
        {
          label: 'doel',
          value: zaaktype?.doel,
          fullWidth: true,
        },
        {
          label: 'aanleiding',
          value: zaaktype?.aanleiding,
          fullWidth: true,
        },
        {
          label: 'toelichting',
          value: zaaktype?.toelichting,
          fullWidth: true,
        },
        {
          label: 'indicatieInternOfExtern',
          value: zaaktype?.indicatieInternOfExtern,
          fullWidth: true,
        },
        {
          label: 'trefwoorden',
          value: zaaktype?.trefwoorden,
          fullWidth: true,
        },
        {
          label: 'vertrouwelijkheidaanduiding',
          value: zaaktype?.vertrouwelijkheidaanduiding,
          fullWidth: true,
        },
        {
          label: 'productenOfDiensten',
          value: zaaktype?.productenOfDiensten,
          fullWidth: true,
        },
        {
          label: 'verantwoordingsrelatie',
          value: zaaktype?.verantwoordingsrelatie,
          fullWidth: true,
        },
      ],
    },
    {
      label: 'Behandeling',
      slug: 'behandeling',
      fields: [
        {
          label: 'handelingInitiator',
          value: zaaktype?.handelingInitiator,
          fullWidth: false,
        },
        {
          label: 'onderwerp',
          value: zaaktype?.onderwerp,
          fullWidth: false,
        },
        {
          label: 'handelingBehandelaar',
          value: zaaktype?.handelingBehandelaar,
          fullWidth: true,
        },
        {
          label: 'doorlooptijd',
          value: zaaktype?.doorlooptijd,
          fullWidth: true,
        },
        {
          label: 'doel',
          value: zaaktype?.servicenorm,
          fullWidth: true,
        },
      ],
    },
    {
      label: 'Opschorten en verlengen',
      slug: 'opschorten-en-verlengen',
      fields: [
        {
          label: 'opschortingEnAanhoudingMogelijk',
          value: zaaktype?.opschortingEnAanhoudingMogelijk,
          fullWidth: false,
        },
        {
          label: 'verlengingMogelijk',
          value: zaaktype?.verlengingMogelijk,
          fullWidth: false,
        },
        {
          label: 'verlengingstermijn',
          value: zaaktype?.verlengingstermijn,
          fullWidth: true,
        },
      ],
    },
    {
      label: 'Gemeentelijke selectielijst',
      slug: 'gemeentelijke-selectielijst',
      fields: [
        {
          label: 'selectielijstProcestype',
          value: zaaktype?.selectielijstProcestype,
          fullWidth: false,
        },
      ],
    },
    {
      label: 'Referentieproces',
      slug: 'referentieproces',
      fields: [
        {
          label: 'referentieprocesnaam',
          value: zaaktype?.referentieproces.naam,
          fullWidth: false,
        },
        {
          label: 'referentieproceslink',
          value: zaaktype?.referentieproces.link,
          fullWidth: false,
        },
      ],
    },
    {
      label: 'Publicatie',
      slug: 'publicatie',
      fields: [
        {
          label: 'publicatieIndicatie',
          value: zaaktype?.publicatieIndicatie,
          fullWidth: true,
        },
        {
          label: 'publicatietekst',
          value: zaaktype?.publicatietekst,
          fullWidth: true,
        },
      ],
    },
    {
      label: 'Geldigheid',
      slug: 'geldigheid',
      fields: [
        {
          label: 'versiedatum',
          value: zaaktype?.versiedatum,
          fullWidth: true,
        },
        {
          label: 'datumBeginGeldigheid',
          value: zaaktype?.beginGeldigheid,
          fullWidth: false,
        },
        {
          label: 'datumEindeGeldigheid',
          value: zaaktype?.eindeGeldigheid,
          fullWidth: false,
        },
      ],
    },
  ];
};
