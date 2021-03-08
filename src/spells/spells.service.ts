/**
 * Data Model Interfaces
 */

import _ from "lodash";
import { Spell, School, AreaOfEffect } from "./spell.interface";
import { DnDClass, DnDSubClass } from "../classInterfaces/class.interface";
import { Spells } from "./spells.interface";
import { DamageType } from "../damageProperties/damageType.enum";
import { NumTargets } from "../damageProperties/numTargets.interface";
import { spellsRouter } from "./spells.router";

let faunadb = require('faunadb'), q = faunadb.query;
let client = new faunadb.Client({ secret: process.env.FAUNA_SECRET})

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
    ritual: false,
    concentration: false,
    components: ["V","S"],
    duration: "Instantaneous",
    description: "A beam of crackling energy streaks toward a creature within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 force damage.\n\nThe spell creates more than one beam when you reach higher levels: two beams at 5th level, three beams at 11th level, and four beams at 17th level. You can direct the beams at the same target or at different ones. Make a separate attack roll for each beam.",
    damage: {
      baseDamage: "1d10",
      damageAtHigherCharacterLevel: {
        5: "2d10",
        11: "3d10",
        17: "4d10"
      }
    },
    damageType: [DamageType.Force],
    numTargets: {
      baseTargets: 1,
      targetsAtHigherCharacterLevel: {
        5: 2,
        11: 3,
        17: 4
      }
    }
  },
  "sleep": {
    id: 2,
    name: "Sleep",
    classes: [DnDClass.Bard, DnDClass.Sorcerer, DnDClass.Wizard],
    subClasses: [DnDSubClass.warlock.archfey, DnDSubClass.paladin.redemption, DnDSubClass.cleric.twilight],
    level: 1,
    school: School.Enchantment,
    castingTime: "1 Action",
    range: "90ft",
    components: ["V","S","M"],
    materials: "a pinch of fine sand, rose petals, or a cricket",
    duration: "1 minute",
    areaOfEffect: {
      shape: "sphere",
      size: "20 feet"
    },
    ritual: false,
    concentration: false,
    description: "This spell sends creatures into a magical slumber. Roll 5d8; the total is how many hit points of creatures this spell can affect. Creatures within 20 feet of a point you choose within range are affected in ascending order of their current hit points (ignoring unconscious creatures).\n\nStarting with the creature that has the lowest current hit points, each creature affected by this spell falls unconscious until the spell ends, the sleeper takes damage, or someone uses an action to shake or slap the sleeper awake. Subtract each creature's hit points from the total before moving on to the creature with the next lowest hit points. A creature's hit points must be equal to or less than the remaining total for that creature to be affected.\nUndead and creatures immune to being charmed aren't affected by this spell.\n\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, roll an additional 2d8 for each slot level above 1st.",
    damage: {
      baseDamage: "5d8",
      damageAtHigherSpellSlots: {
        2: "2d8",
        3: "4d8",
        4: "6d8",
        5: "8d8",
        6: "10d8",
        7: "12d8",
        8: "14d8",
        9: "16d8"
      }
    }
  }
}

  /**
   * Service Methods
   */

export const findAll = async (): Promise<Spells> => {
  return spells;
};

export const findAllFauna = async (): Promise<Spells> => {
  //tbd
  return spells;
}

export const findByName = async (name: string): Promise<Spell> => {
  const record: Spell = spells[name];

  if(record) {
    return record;
  }

  throw new Error("No record found");
}

export const createByName = async (newSpell: Spell): Promise<boolean> => {
  const id = new Date().valueOf();
  let name = newSpell.name;
  name = _.camelCase(name);

  if(spells[name] === undefined) {
    spells[name] = {
      ... newSpell,
      id
    };
    console.log(name + " created");
    return true;
  } else {
    console.log("duplicate spell " + name + " not entered in DB.")
    return false;
  }
}

export const update = async (updatedSpell: Spell): Promise<boolean> => {
  let name = updatedSpell.name;
  name = _.camelCase(name);
  if (spells[name]) {
    spells[name] = updatedSpell;
    console.log(name + " updated");
    return true;
  } else {
    console.log("Spell: " + updatedSpell.name + " not found");
    return false;
  }

  throw new Error("No record found to update");
};

export const removeByName = async (name: string): Promise<boolean> => {
  const record: Spell = spells[name];

  if(record) {
    delete spells[name];
    console.log(name + " deleted");
    return true;
  } else {
    console.log("Spell: " + name + " not found");
    return false;
  }

  throw new Error("No record found to delete");
} 