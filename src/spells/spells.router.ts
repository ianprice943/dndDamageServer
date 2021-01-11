/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import _ from "lodash";
import * as SpellsService from "./spells.service";
import { Spell } from "./spell.interface";
import { Spells } from "./spells.interface";

import { checkJwt } from "../middleware/authz.middleware";
import { checkPermissions } from "../middleware/permissions.middleware";
import { SpellPermissions } from "./spell-permissions";

/**
 * Router Definition
 */

export const spellsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET spells/

spellsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const spells: Spells = await SpellsService.findAll();

    res.status(200).send(spells);
  } catch(e) {
    res.status(404).send(e.message)
  }
});

// GET spells/:id

/*spellsRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const spell: Spell = await SpellsService.findById(id);

    res.status(200).send(spell);
  } catch(e) {
    res.status(404).send(e.message);
  }
})*/

spellsRouter.get("/:name", async (req: Request, res: Response) => {
  let name: string = req.params.name;
  name = _.camelCase(name);

  try {
    const spell: Spell = await SpellsService.findByName(name);

    res.status(200).send(spell);
  } catch(e) {
    res.status(404).send(e.message);
  }
})

// Mount authorization middleware as POST, PUT, and DELETE require authorization
spellsRouter.use(checkJwt);

// POST spells/

spellsRouter.post(
  "/",
  checkPermissions(SpellPermissions.CreateSpells),
  async (req: Request, res: Response) => {
    try {
      const spell: Spell = req.body.spell;

      await SpellsService.createByName(spell);

      res.sendStatus(201);
    } catch(e) {
      res.status(404).send(e.message);
    }
  }
);

// PUT spells/

spellsRouter.put(
  "/", 
  checkPermissions(SpellPermissions.UpdateSpells),
  async (req: Request, res: Response) => {
    try {
      const spell: Spell = req.body.spell;

      await SpellsService.update(spell);

      res.sendStatus(200);
    } catch(e) {
      res.status(500).send(e.message);
    }
  }
);

// DELETE spells/:id

/*
spellsRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await SpellsService.remove(id);

    res.sendStatus(200);
  } catch(e) {
    res.status(500).send(e.message);
  }
})*/

spellsRouter.delete(
  "/:name",
  checkPermissions(SpellPermissions.DeleteSpells),
  async (req: Request, res: Response) => {
    try {
      let name: string = req.params.name;
      name = _.camelCase(name);
      await SpellsService.removeByName(name);

      res.sendStatus(200);
    } catch(e) {
      res.status(500).send(e.message);
    }
  }
);