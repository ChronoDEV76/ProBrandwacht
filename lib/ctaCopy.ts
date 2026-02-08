export type Audience = 'brandwacht' | 'opdrachtgever' | 'generic'

export type CtaVariant = 'outline' | 'ghost' | 'link' | 'default'

export type CtaId =
  // Global / principle
  | 'primary_select'
  | 'primary_select_compact'
  | 'secondary_why_no'
  | 'secondary_how_we_work'
  | 'tertiary_contact_exploratory'
  | 'secondary_back_home'
  // Audience specific
  | 'brandwacht_learn_selection'
  | 'brandwacht_intake_fit'
  | 'opdrachtgever_intake_fit'
  | 'brandwacht_interest_waitlist'
  | 'brandwacht_kaders'
  | 'brandwacht_principles'
  | 'brandwacht_kennisbank'
  | 'opdrachtgever_fit_your_case'
  | 'opdrachtgever_explore'
  | 'opdrachtgever_kaders_disclaimer'
  | 'opdrachtgever_kennisbank'
  | 'about_kaders_intentie'
  | 'about_kennisbank'
  | 'about_contact_email'
  | 'secondary_steden_overview'
  | 'secondary_spoed_direct'
  | 'secondary_direct_route'
  | 'secondary_platform_fit'
  | 'secondary_faq'
  | 'secondary_how_inhuren'
  | 'secondary_over_ons'
  | 'secondary_blog_index'
  | 'secondary_seo_resources'
  | 'secondary_kader_overview'
  | 'secondary_afbakening'
  | 'secondary_checklist_info'

export type Cta = {
  id: CtaId
  label: string
  href: string
  variant: CtaVariant
  intent: 'primary' | 'secondary' | 'tertiary'
  audience: Audience
}

const CTA: Record<CtaId, Cta> = {
  primary_select: {
    id: 'primary_select',
    label: 'Dit sluit aan bij deze werkwijze',
    href: '/voor-brandwachten',
    variant: 'outline',
    intent: 'primary',
    audience: 'generic',
  },
  primary_select_compact: {
    id: 'primary_select_compact',
    label: 'Dit past bij deze werkwijze',
    href: '/voor-brandwachten',
    variant: 'outline',
    intent: 'primary',
    audience: 'generic',
  },
  secondary_why_no: {
    id: 'secondary_why_no',
    label: 'Waarom er soms nee wordt gezegd →',
    href: '/waarom-wij-soms-nee-zeggen',
    variant: 'link',
    intent: 'secondary',
    audience: 'generic',
  },
  secondary_how_we_work: {
    id: 'secondary_how_we_work',
    label: 'Lees hoe randvoorwaarden worden benoemd →',
    href: '/waarom-wij-soms-nee-zeggen',
    variant: 'link',
    intent: 'secondary',
    audience: 'generic',
  },
  tertiary_contact_exploratory: {
    id: 'tertiary_contact_exploratory',
    label: 'Verkennend contact',
    href: '/contact',
    variant: 'outline',
    intent: 'tertiary',
    audience: 'generic',
  },
  secondary_back_home: {
    id: 'secondary_back_home',
    label: 'Terug naar home',
    href: '/',
    variant: 'link',
    intent: 'secondary',
    audience: 'generic',
  },
  brandwacht_learn_selection: {
    id: 'brandwacht_learn_selection',
    label: 'Lees hoe rolafbakening wordt beschreven →',
    href: '/voor-brandwachten',
    variant: 'link',
    intent: 'secondary',
    audience: 'brandwacht',
  },
  brandwacht_intake_fit: {
    id: 'brandwacht_intake_fit',
    label: 'Stel een inhoudelijke vraag',
    href: '/contact',
    variant: 'outline',
    intent: 'primary',
    audience: 'brandwacht',
  },
  opdrachtgever_intake_fit: {
    id: 'opdrachtgever_intake_fit',
    label: 'Stel een inhoudelijke vraag →',
    href: '/contact',
    variant: 'outline',
    intent: 'primary',
    audience: 'opdrachtgever',
  },
  brandwacht_interest_waitlist: {
    id: 'brandwacht_interest_waitlist',
    label: 'Contact & reflectie',
    href: '/contact',
    variant: 'link',
    intent: 'secondary',
    audience: 'brandwacht',
  },
  brandwacht_kaders: {
    id: 'brandwacht_kaders',
    label: 'Kaders & verantwoordelijkheid',
    href: '/belangen',
    variant: 'outline',
    intent: 'secondary',
    audience: 'brandwacht',
  },
  brandwacht_principles: {
    id: 'brandwacht_principles',
    label: 'Uitgangspunten',
    href: '/voorwaarden',
    variant: 'outline',
    intent: 'secondary',
    audience: 'brandwacht',
  },
  brandwacht_kennisbank: {
    id: 'brandwacht_kennisbank',
    label: 'Kennisbank',
    href: '/blog',
    variant: 'outline',
    intent: 'secondary',
    audience: 'brandwacht',
  },
  opdrachtgever_fit_your_case: {
    id: 'opdrachtgever_fit_your_case',
    label: 'Bekijk of dit past bij de vraag →',
    href: '/opdrachtgevers',
    variant: 'link',
    intent: 'secondary',
    audience: 'opdrachtgever',
  },
  opdrachtgever_explore: {
    id: 'opdrachtgever_explore',
    label: 'Stel een inhoudelijke vraag',
    href: '/contact',
    variant: 'link',
    intent: 'tertiary',
    audience: 'opdrachtgever',
  },
  opdrachtgever_kaders_disclaimer: {
    id: 'opdrachtgever_kaders_disclaimer',
    label: 'Kaders / disclaimer',
    href: '/disclaimer',
    variant: 'outline',
    intent: 'secondary',
    audience: 'opdrachtgever',
  },
  opdrachtgever_kennisbank: {
    id: 'opdrachtgever_kennisbank',
    label: 'Lees de kennisbank',
    href: '/blog',
    variant: 'outline',
    intent: 'secondary',
    audience: 'opdrachtgever',
  },
  about_kaders_intentie: {
    id: 'about_kaders_intentie',
    label: 'Kaders & intentie',
    href: '/belangen',
    variant: 'outline',
    intent: 'secondary',
    audience: 'generic',
  },
  about_kennisbank: {
    id: 'about_kennisbank',
    label: 'Kennisbank',
    href: '/blog',
    variant: 'outline',
    intent: 'secondary',
    audience: 'generic',
  },
  about_contact_email: {
    id: 'about_contact_email',
    label: 'Contact',
    href: 'mailto:info@prosafetymatch.nl',
    variant: 'outline',
    intent: 'tertiary',
    audience: 'generic',
  },
  secondary_steden_overview: {
    id: 'secondary_steden_overview',
    label: 'Terug naar stedenoverzicht',
    href: '/steden',
    variant: 'outline',
    intent: 'secondary',
    audience: 'generic',
  },
  secondary_spoed_direct: {
    id: 'secondary_spoed_direct',
    label: 'ProBrandwacht Direct (spoed) →',
    href: '/probrandwacht-direct-spoed',
    variant: 'link',
    intent: 'secondary',
    audience: 'generic',
  },
  secondary_direct_route: {
    id: 'secondary_direct_route',
    label: 'Lees ProBrandwacht Direct →',
    href: '/probrandwacht-direct',
    variant: 'link',
    intent: 'secondary',
    audience: 'generic',
  },
  secondary_platform_fit: {
    id: 'secondary_platform_fit',
    label: 'Bekijk of deze werkwijze past',
    href: '/platform',
    variant: 'link',
    intent: 'secondary',
    audience: 'generic',
  },
  secondary_faq: {
    id: 'secondary_faq',
    label: 'Eerst de FAQ',
    href: '/faq',
    variant: 'outline',
    intent: 'secondary',
    audience: 'generic',
  },
  secondary_how_inhuren: {
    id: 'secondary_how_inhuren',
    label: 'Lees hoe samenwerking werkt →',
    href: '/opdrachtgevers',
    variant: 'link',
    intent: 'secondary',
    audience: 'generic',
  },
  secondary_over_ons: {
    id: 'secondary_over_ons',
    label: 'Lees het verhaal →',
    href: '/over-ons',
    variant: 'link',
    intent: 'secondary',
    audience: 'generic',
  },
  secondary_blog_index: {
    id: 'secondary_blog_index',
    label: 'Terug naar kennisbank',
    href: '/blog',
    variant: 'outline',
    intent: 'secondary',
    audience: 'generic',
  },
  secondary_seo_resources: {
    id: 'secondary_seo_resources',
    label: 'Bekijk alle autoritaire bronnen →',
    href: '/seo-resources',
    variant: 'link',
    intent: 'secondary',
    audience: 'generic',
  },
  secondary_kader_overview: {
    id: 'secondary_kader_overview',
    label: 'Lees het kader',
    href: '/veiligheidskundig-kader',
    variant: 'outline',
    intent: 'secondary',
    audience: 'generic',
  },
  secondary_afbakening: {
    id: 'secondary_afbakening',
    label: 'Afbakening bekijken',
    href: '/waarom-wij-soms-nee-zeggen',
    variant: 'outline',
    intent: 'secondary',
    audience: 'generic',
  },
  secondary_checklist_info: {
    id: 'secondary_checklist_info',
    label: 'Bekijk afspraken-checklist',
    href: '/blog/5-veelvoorkomende-aandachtspunten-bij-brandwacht-inzet',
    variant: 'outline',
    intent: 'secondary',
    audience: 'generic',
  },
}

export function getCta(id: CtaId): Cta {
  return CTA[id]
}

export function listCtas(filter?: Partial<Pick<Cta, 'intent' | 'audience'>>) {
  const items = Object.values(CTA)
  if (!filter) return items
  return items.filter(cta => {
    if (filter.intent && cta.intent !== filter.intent) return false
    if (filter.audience && cta.audience !== filter.audience) return false
    return true
  })
}
