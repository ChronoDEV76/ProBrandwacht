const cityPageFlag = process.env.NEXT_PUBLIC_ENABLE_CITY_PAGES

export const CITY_PAGES_ENABLED =
  cityPageFlag === 'false' ? false : true
