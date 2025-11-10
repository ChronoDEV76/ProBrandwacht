const isProd =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production'

const uiFlag = process.env.NEXT_PUBLIC_ENABLE_SPOED
const routeFlag = process.env.ENABLE_SPOED_ROUTE

export const SPOED_UI_ENABLED =
  uiFlag === 'true' ? true : uiFlag === 'false' ? false : !isProd

export const SPOED_ROUTE_ENABLED =
  routeFlag === 'true' ? true : routeFlag === 'false' ? false : SPOED_UI_ENABLED
