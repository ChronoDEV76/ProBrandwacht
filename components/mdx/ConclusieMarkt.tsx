import Bronnen from './Bronnen'

export default function ConclusieMarkt() {
  return (
    <section className="my-8 space-y-4 rounded-xl border border-slate-300 bg-slate-50 p-4 text-slate-900">
      <p className="text-sm">
        De huidige ketenstructuur in de brandwachtmarkt maakt verantwoordelijkheden soms diffuus. Dat remt motivatie en
        kwaliteit, zeker bij veiligheidskritische inzet.
      </p>
      <h2 className="text-xl font-semibold">Conclusie: duidelijkheid is de sleutel</h2>
      <p>
        In veel gevallen werken brandwachten als zelfstandige zonder de zekerheden van loondienst. Heldere afspraken over
        rol, bevoegdheden en verantwoordelijkheid zijn essentieel om motivatie en kwaliteit te behouden.
      </p>
      <p>
        Toetsbare afspraken en gezamenlijke verantwoordelijkheid maken samenwerking duurzaam. Dat is in het belang van
        opdrachtgever, professional en veiligheid op locatie.
      </p>
      <Bronnen
        items={[
          {
            label: 'CBS StatLine – Cao-lonen & contractuele afspraken',
            href: 'https://opendata.cbs.nl/statline/#/CBS/nl/dataset/85663NED',
          },
          {
            label: 'Belastingdienst – Arbeidsrelaties & Wet DBA',
            href: 'https://www.belastingdienst.nl/wps/wcm/connect/nl/arbeidsrelaties/arbeidsrelaties',
          },
          { label: 'CAO Veiligheidsregio’s 2024', href: 'https://www.brandweer.nl' },
        ]}
      />
    </section>
  )
}
