'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { getGtmId, getGaMeasurementId } from '@/lib/config'

type AnalyticsWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>
  gtag?: (...args: unknown[]) => void
}

export default function AnalyticsScripts() {
  const gtmId = getGtmId()
  const gaId = getGaMeasurementId()
  const pathname = usePathname() || ''
  const searchParams = useSearchParams()
  const search = searchParams?.toString() || ''
  const query = search ? `?${search}` : ''

  useEffect(() => {
    if (!gaId) return
    if (typeof window === 'undefined') return
    const pagePath = `${pathname}${query}` || '/'
    const analyticsWindow = window as AnalyticsWindow
    analyticsWindow.dataLayer = analyticsWindow.dataLayer || []
    analyticsWindow.dataLayer.push({ event: 'pageview', page_path: pagePath })
    analyticsWindow.gtag?.('config', gaId, { page_path: pagePath })
  }, [gaId, pathname, query])
  return (
    <>
      {gtmId ? (
        <>
          <Script id="gtm-loader" strategy="lazyOnload">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              // capture share events locally for debug view
              (function(){
                var dl = w[l];
                if (!dl.push.__pbwWrapped){
                  var orig = dl.push.bind(dl);
                  dl.push = function(){
                    try{
                      var evt = arguments[0];
                      if(evt && evt.event === 'share_click'){
                        w.__shareEvents = w.__shareEvents || [];
                        w.__shareEvents.push({ts: Date.now(), ...evt});
                      }
                    }catch(e){}
                    return orig.apply(null, arguments);
                  };
                  dl.push.__pbwWrapped = true;
                }
              })();
              })(window,document,'script','dataLayer','${gtmId}');
            `}
          </Script>
          <noscript suppressHydrationWarning>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              loading="lazy"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </>
      ) : null}
      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="lazyOnload"
          />
          <Script id="ga4-init" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { send_page_view: true });
            `}
          </Script>
        </>
      ) : null}
    </>
  )
}
