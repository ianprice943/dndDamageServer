interface DamageSubObject {
  [key: string]: string
}

export interface Damage {
  baseDamage: string,
  damageAtHigherCharacterLevel?: DamageSubObject,
  damageAtHigherSpellSlots?: DamageSubObject
}