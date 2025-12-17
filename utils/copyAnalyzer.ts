// utils/copyAnalyzer.ts

export type CopyAnalysis = {
  bureauScore: number
  influenceScore: number
  warnings: string[]
}

const bureauWords = [
  'bemiddelingsbureau',
  'detacheringsbureau',
  'intermediair',
  'arbeidsbemiddelaar',
  'ketenpartner',
  'ketenpartij',
  'via ons netwerk',
  'wij regelen alles',
  'we regelen alles',
  'word gevonden', // passief + bureaugevoel
  'vind jij via ons',
  'we zoeken opdrachten voor jou',
]

const disempoweringPatterns = [
  'er wordt',
  'wordt voor je geregeld',
  'wordt geregeld',
  'kan niet',
  'mag niet',
  'moet je accepteren',
  'je krijgt wat je krijgt',
  'je hebt geen invloed',
]

const empoweringWords = [
  'kies zelf',
  'bepaal zelf',
  'direct zichtbaar',
  'rechtstreeks',
  'zonder bureau',
  'zonder bemiddelingsbureau',
  'zonder marge',
  'jij houdt meer over',
  'jij kiest',
  'jij bepaalt',
  'zelf aan de slag',
  'direct contact',
  'eerlijk',
  'dbA-proof',
  'dba-proof',
]

/**
 * Eenvoudige heuristische check op "bureautaal" en Circle of Influence.
 */
export function analyzeCopy(text: string): CopyAnalysis {
  const lower = text.toLowerCase()
  const warnings: string[] = []

  let bureauScore = 0
  let influenceScore = 0

  // 1. Bureautaal detecteren
  bureauWords.forEach((phrase) => {
    if (lower.includes(phrase)) {
      bureauScore += 2
      warnings.push(`Bureautaal gevonden: “${phrase}”`)
    }
  })

  // 2. Passieve / afhankelijke taal (negatief voor Circle of Influence)
  disempoweringPatterns.forEach((phrase) => {
    if (lower.includes(phrase)) {
      influenceScore -= 2
      warnings.push(`Afhankelijke / passieve formulering: “${phrase}”`)
    }
  })

  // 3. Autonomie / eigenaarschap (positief)
  empoweringWords.forEach((phrase) => {
    if (lower.includes(phrase)) {
      influenceScore += 2
      // Alleen een hint als positief signaal
      warnings.push(`Mooie Circle-of-Influence-taal: “${phrase}”`)
    }
  })

  // 4. Heel ruwe check op passieve constructies “wordt …”
  const passiveMatches = lower.match(/wordt\s+\w+?d\b/g) // wordt geregeld, wordt gevonden, wordt betaald
  if (passiveMatches && passiveMatches.length > 0) {
    influenceScore -= passiveMatches.length
    warnings.push(
      `Passieve zinnen gevonden (check of je dit actiever kunt maken): ${passiveMatches.join(
        ', '
      )}`
    )
  }

  return {
    bureauScore,
    influenceScore,
    warnings,
  }
}
