/**
 * Data Model Interfaces
 */

import _ from "lodash";
import { Spell, School, AreaOfEffect } from "./spell.interface";
import { DnDClass, DnDSubClass } from "../classInterfaces/class.interface";
import { Spells } from "./spells.interface";
import { DamageType } from "../damageProperties/damageType.enum";
import { spellsRouter } from "./spells.router";

 /**
  * Mock DB
  */

const spells: Spells = {
  "eldritchBlast": {
    id: 1,
    name: "Eldritch Blast",
    classes: [DnDClass.Warlock],
    subClasses: [DnDSubClass.bard.lore],
    level: 0,
    school: School.Evocation,
    castingTime: "1 Action",
    range: "120 ft",
    components: ["V","S"],
    duration: "Instantaneous",
    description: "A beam of crackling energy streaks toward a creature within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 force damage.\nThe spell creates more than one beam when you reach higher levels: two beams at 5th level, three beams at 11th level, and four beams at 17th level. You can direct the beams at the same target or at different ones. Make a separate attack roll for each beam.",
    damage: {
      "baseDamage": "1d10",
      "damageAtHigherCharacterLevels": {
        "5": "2d10",
        "11": "3d10",
        "17": "4d10"
      }
    },
    damageType: DamageType.Force,
  }
}

  /**
   * Service Methods
   */

export const findAll = async (): Promise<Spells> => {
  return spells;
};

/*export const findById = async (id: number): Promise<Spell> => {
  const record: Spell = spells[id];

  if (record) {
    return record;
  }

  throw new Error("No record found");
};*/

export const findByName = async (name: string): Promise<Spell> => {
  const record: Spell = spells[name];

  if(record) {
    return record;
  }

  throw new Error("No record found");
}

/*export const createById = async (newSpell: Spell): Promise<void> => {
  const id = new Date().valueOf();
  spells[id] = {
    ...newSpell,
    id
  };
};*/

export const createByName = async (newSpell: Spell): Promise<void> => {
  const id = new Date().valueOf();
  let name = newSpell.name;
  name = _.camelCase(name);

  console.log(name);

  spells[name] = {
    ... newSpell,
    id
  };
}

export const update = async (updatedSpell: Spell): Promise<void> => {
  let name = updatedSpell.name;
  name = _.camelCase(name);
  if (spells[name]) {
    spells[name] = updatedSpell;
    return;
  }

  throw new Error("No record found to update");
};
/*
export const removeById = async (id: number): Promise<void> => {
  const record: Spell = spells[id];

  if (record) {
    delete spells[id];
    return;
  }

  throw new Error("No record found to delete");
};*/

export const removeByName = async (name: string): Promise<void> => {
  const record: Spell = spells[name];

  if(record) {
    delete spells[name];
    return;
  }

  throw new Error("No record found to delete");
} 