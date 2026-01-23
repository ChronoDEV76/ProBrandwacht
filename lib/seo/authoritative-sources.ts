export type AuthoritativeSource = {
  id: string
  title: string
  description: string
  links: { label: string; href: string }[]
}

export const authoritativeSources: AuthoritativeSource[] = [
  {
    id: 'cbs',
    title: 'CBS (Centraal Bureau voor de Statistiek)',
    description: 'Cao-lonen en arbeid (85663NED).',
    links: [
      {
        label: 'CBS StatLine cao-lonen & contractuele afspraken',
        href: 'https://opendata.cbs.nl/statline/#/CBS/nl/dataset/85663NED',
      },
    ],
  },
  {
    id: 'kvk',
    title: 'KVK (Kamer van Koophandel)',
    description: 'Ondernemersregels en inschrijven als zelfstandige.',
    links: [
      {
        label: 'KVK – Inschrijven en ondernemen',
        href: 'https://www.kvk.nl/inschrijven-en-wijzigen/',
      },
    ],
  },
  {
    id: 'belastingdienst',
    title: 'Belastingdienst',
    description: 'Wet DBA en werken met zzp’ers.',
    links: [
      {
        label: 'Belastingdienst – Arbeidsrelaties & Wet DBA',
        href: 'https://www.belastingdienst.nl/wps/wcm/connect/nl/arbeidsrelaties/arbeidsrelaties',
      },
    ],
  },
  {
    id: 'fnv',
    title: 'FNV (Vakbond)',
    description: 'Cao Veiligheidsregio’s en zzp-perspectief.',
    links: [
      {
        label: 'FNV – Cao Veiligheidsregio’s & brandweer',
        href: 'https://www.fnv.nl/cao-sector/overheid/decentrale-overheden/brandweer/goede-cao-veiligheidsregios-nu',
      },
      {
        label: 'FNV – Zelfstandigen',
        href: 'https://www.fnv.nl/zzp',
      },
    ],
  },
  {
    id: 'inspectie-szw',
    title: 'Inspectie SZW (Arbeidsinspectie)',
    description: 'Handhaving rond onduidelijke contractvormen.',
    links: [
      {
        label: 'Inspectie SZW – Onduidelijke contractvormen',
        href: 'https://www.nlarbeidsinspectie.nl/publicaties/rapporten/2018/06/15/aanpak-schijnconstructies-en-cao-naleving-2014-2018',
      },
    ],
  },
  {
    id: 'rijksoverheid',
    title: 'Rijksoverheid',
    description: 'Algemeen beleid zzp en arbeidsmarkt.',
    links: [
      {
        label: 'Rijksoverheid – Zzp en arbeidsmarkt',
        href: 'https://www.rijksoverheid.nl/onderwerpen/zelfstandigen-zonder-personeel-zzp/nieuwe-maatregelen-zzpers-en-opdrachtgevers',
      },
    ],
  },
  {
    id: 'ser',
    title: 'SER (Sociaal-Economische Raad)',
    description: 'Adviezen over arbeidsmarkt en zzp.',
    links: [
      {
        label: 'SER – Zelfstandigen zonder personeel',
        href: 'https://www.ser.nl/-/media/ser/downloads/adviezen/2010/visie-zelfstandigen-zonder-personeel.pdf',
      },
    ],
  },
  {
    id: 'ifv',
    title: 'IFV (Instituut Fysieke Veiligheid)',
    description: 'Onderzoeken en richtlijnen brandweer en crisisbeheersing.',
    links: [
      {
        label: 'IFV – Publicaties brandweer',
        href: 'https://www.ifv.nl/kennisplein/brandweer',
      },
    ],
  },
]
