import Script from 'next/script'
import { getGtmId, getGaMeasurementId } from '@/lib/config'
import AnalyticsTracker from '@/components/analytics-tracker'

export default function AnalyticsScripts() {
  const gtmId = getGtmId()
  const gaId = getGaMeasurementId()

  const shouldRenderTracker = Boolean(gtmId || gaId)

  return (
    <>
      {(gtmId || gaId) ? (
        <Script id="consent-default" strategy="afterInteractive">
          {`
            (function(){
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = window.gtag || gtag;
              var consent = {
                ad_storage: 'denied',
                analytics_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                wait_for_update: 500
              };
              var dnt = (navigator.doNotTrack === '1' || window.doNotTrack === '1' || navigator.msDoNotTrack === '1');
              var stored = null;
              try { stored = window.localStorage.getItem('pb_cookie_consent'); } catch(e){}
              if (!dnt && stored === 'accepted') {
                consent.ad_storage = 'granted';
                consent.analytics_storage = 'granted';
                consent.ad_user_data = 'granted';
                consent.ad_personalization = 'granted';
              }
              gtag('consent', 'default', consent);
            })();
          `}
        </Script>
      ) : null}
      {gtmId ? (
        <>
          <Script id="gtm-loader" strategy="afterInteractive">
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
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { send_page_view: true });
            `}
          </Script>
        </>
      ) : null}
      {shouldRenderTracker ? <AnalyticsTracker gaId={gaId} /> : null}
    </>
  )
}
