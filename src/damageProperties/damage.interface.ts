interface DamageSubObject {
  [key: number]: string
}

export interface Damage {
  baseDamage: string,
  damageAtHigherCharacterLevel?: DamageSubObject,
  damageAtHigherSpellSlots?: DamageSubObject
}