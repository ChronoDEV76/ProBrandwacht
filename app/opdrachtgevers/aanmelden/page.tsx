import type { Metadata } from 'next'
import ClientSignupForm from '@/components/opdrachtgevers/client-signup-form'

export const metadata: Metadata = {
  title: 'Aanmelden als opdrachtgever | ProBrandwacht.nl',
  description:
    'Registreer je als opdrachtgever voor ProSafetyMatch. Lever bedrijfsgegevens veilig aan en ontvang updates zodra je dashboard beschikbaar is.',
}

export default function OpdrachtgeverAanmeldenPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-white py-10">
      <ClientSignupForm className="px-4 sm:px-6 md:px-0" />
    </div>
  )
}

