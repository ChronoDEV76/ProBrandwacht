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
    description: 'Cao-lonen, loonkosten en arbeid (85663NED).',
    links: [
      {
        label: 'CBS StatLine cao-lonen & contractuele loonkosten',
        href: 'https://opendata.cbs.nl/statline/#/CBS/nl/dataset/85663NED',
      },
    ],
  },
  {
    id: 'kvk',
    title: 'KVK (Kamer van Koophandel)',
    description: 'Uurtarief berekenen zzp en ondernemersregels.',
    links: [
      {
        label: 'KVK – Uurtarief berekenen als zzp’er',
        href: 'https://www.kvk.nl/geldzaken/rekentool-uurtarief-berekenen/',
      },
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
    description: 'Handhaving schijnzelfstandigheid.',
    links: [
      {
        label: 'Inspectie SZW – Schijnzelfstandigheid',
        href: 'https://www.nlarbeidsinspectie.nl/onderwerpen/schijnzelfstandigheid',
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
        href: 'https://www.rijksoverheid.nl/onderwerpen/freelancers-en-zzp',
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
        href: 'https://www.ser.nl/nl/thema/zelfstandigen',
      },
    ],
  },
  {
    id: 'nibud',
    title: 'Nibud',
    description: 'Inkomens- en kostencalculaties voor zzp.’s.',
    links: [
      {
        label: 'Nibud – Uurtarief bepalen',
        href: 'https://www.nibud.nl/ondernemers/wat-is-een-goed-zzp-tarief/',
      },
    ],
  },
  {
    id: 'eu-commission',
    title: 'Europese Commissie (EU)',
    description: 'Richtlijnen platformwerk en zzp.',
    links: [
      {
        label: 'Europese Commissie – Platformwerk',
        href: 'https://commission.europa.eu/strategy-and-policy/priorities-2019-2024/economy-works-people/jobs-growth-and-investment/working-conditions-platform-work_en',
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
