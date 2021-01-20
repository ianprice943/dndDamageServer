interface NumTargetsSubObject {
  [key: number]: number
}

export interface NumTargets {
  baseTargets: number,
  targetsAtHigherCharacterLevel?: NumTargetsSubObject,
  targetsAtHigherSpellSlot?: NumTargetsSubObject
}