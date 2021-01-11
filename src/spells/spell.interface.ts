import { DnDClass } from "../classInterfaces/class.interface";
import { DamageType } from "../damageProperties/damageType.enum";

export enum School {
  Abjuration = "Abjuration",
  Conjuration = "Conjuration",
  Divination = "Divination",
  Enchantment = "Enchantment",
  Evocation = "Evocation",
  Illusion = "Illusion",
  Necromancy = "Necromancy",
  Transmutation = "Transmutation"
}

export interface AreaOfEffect {
  type: string,
  size: number
}

export interface Spell {
  id: number,
  name: string,
  classes: Array<DnDClass>,
  subClasses?: Array<string>, //DnDSubClass is an object literal with strings as the endpoints, so an Array of strings is the best I could come up with 
  level: Number,
  school: School,
  castingTime: string,
  range: string,
  areaOfEffect?: AreaOfEffect,
  ritual?: boolean,
  concentration?: boolean,
  components: Array<string>,
  materials?: string,
  duration: string,
  description: string,
  damage?: Object, // strings keys and string values, keys will be 'damage', 'damageAtHigherCharacterLevels', 'damageAtHigherSpellSlots'
  damageType?: DamageType,
}