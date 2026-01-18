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
    label: 'Dit sluit aan bij hoe ik wil werken',
    href: '/voor-brandwachten',
    variant: 'outline',
    intent: 'primary',
    audience: 'generic',
  },
  primary_select_compact: {
    id: 'primary_select_compact',
    label: 'Dit past bij mijn manier van werken',
    href: '/voor-brandwachten',
    variant: 'outline',
    intent: 'primary',
    audience: 'generic',
  },
  secondary_why_no: {
    id: 'secondary_why_no',
    label: 'Waarom wij soms nee zeggen →',
    href: '/waarom-wij-soms-nee-zeggen',
    variant: 'link',
    intent: 'secondary',
    audience: 'generic',
  },
  secondary_how_we_work: {
    id: 'secondary_how_we_work',
    label: 'Lees hoe wij opdrachten beoordelen →',
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
    label: 'Lees hoe wij opdrachten selecteren →',
    href: '/voor-brandwachten',
    variant: 'link',
    intent: 'secondary',
    audience: 'brandwacht',
  },
  brandwacht_intake_fit: {
    id: 'brandwacht_intake_fit',
    label: 'Dit past bij mijn manier van werken',
    href: '/voor-brandwachten/aanmelden',
    variant: 'outline',
    intent: 'primary',
    audience: 'brandwacht',
  },
  opdrachtgever_intake_fit: {
    id: 'opdrachtgever_intake_fit',
    label: 'Bekijk of dit past bij uw vraag →',
    href: '/opdrachtgevers/aanmelden',
    variant: 'outline',
    intent: 'primary',
    audience: 'opdrachtgever',
  },
  brandwacht_interest_waitlist: {
    id: 'brandwacht_interest_waitlist',
    label: 'Start verkennende intake',
    href: '/voor-brandwachten/aanmelden',
    variant: 'outline',
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
    label: 'Bekijk of dit past bij uw vraag →',
    href: '/opdrachtgevers',
    variant: 'link',
    intent: 'secondary',
    audience: 'opdrachtgever',
  },
  opdrachtgever_explore: {
    id: 'opdrachtgever_explore',
    label: 'Leg uw situatie voor',
    href: '/opdrachtgevers/aanmelden',
    variant: 'outline',
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
    label: 'Direct spoed (op basis van beschikbaarheid) →',
    href: '/probrandwacht-direct-spoed',
    variant: 'link',
    intent: 'secondary',
    audience: 'generic',
  },
  secondary_direct_route: {
    id: 'secondary_direct_route',
    label: 'Lees de Direct-route →',
    href: '/probrandwacht-direct',
    variant: 'link',
    intent: 'secondary',
    audience: 'generic',
  },
  secondary_platform_fit: {
    id: 'secondary_platform_fit',
    label: 'Bekijk of deze werkwijze bij je past',
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
    label: 'Lees hoe inhuren werkt →',
    href: '/brandwacht-inhuren',
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
