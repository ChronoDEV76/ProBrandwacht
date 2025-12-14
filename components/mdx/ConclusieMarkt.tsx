import Bronnen from './Bronnen'

export default function ConclusieMarkt() {
  return (
    <section className="my-8 space-y-4">
      <p className="rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-900">
        De huidige tussenstructuur in de brandwachtmarkt legt risico’s bij de zelfstandige, terwijl tarieven nog steeds
        voortkomen uit loondienstmodellen. Dat remt motivatie en kwaliteit.
      </p>
      <h2 className="text-xl font-semibold text-slate-900">Conclusie: het systeem is scheef, niet de mensen</h2>
      <p className="text-slate-900">
        In veel gevallen werken brandwachten als zelfstandige zonder de zekerheden van loondienst, terwijl hun tarief is
        afgeleid van cao-logica. De risico’s liggen bij de zzp’er, terwijl marges bij intermediairs blijven.
      </p>
      <p className="text-slate-900">
        Transparantie over tariefopbouw en gedeelde verantwoordelijkheid zijn essentieel om motivatie en kwaliteit te
        behouden. Een model waarin opdrachtgever, platform en professional eerlijk delen in risico en beloning maakt de
        markt duurzaam.
      </p>
      <Bronnen
        items={[
          {
            label: 'CBS StatLine – Cao-lonen & contractuele loonkosten',
            href: 'https://opendata.cbs.nl/statline/#/CBS/nl/dataset/85663NED',
          },
          {
            label: 'ZZP Nederland – Kostprijsmodel zelfstandigen',
            href: 'https://www.zzp-nederland.nl/search?search_page_search_field=tarieven',
          },
          { label: 'CAO Veiligheidsregio’s 2024', href: 'https://www.brandweer.nl' },
        ]}
      />
    </section>
  )
}
