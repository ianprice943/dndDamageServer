interface NumTargetsSubObject {
  [key: string]: string
}

export interface NumTargets {
  baseTargets: number,
  targetsAtHigherCharacterLevel?: NumTargetsSubObject,
  targetsAtHigherSpellSlot?: NumTargetsSubObject
}