"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Team_1 = __importDefault(require("../models/Team"));
const router = (0, express_1.Router)();
// GET all teams
router.get('/', async (req, res) => {
    try {
        const teams = await Team_1.default.find().populate('leader members');
        res.json({ message: 'Get all teams', data: teams });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch teams' });
    }
});
// GET team by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const team = await Team_1.default.findById(id).populate('leader members');
        if (!team) {
            return res.status(404).json({ message: `Team ${id} not found` });
        }
        res.json({ message: `Get team ${id}`, data: team });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch team' });
    }
});
// POST create new team
router.post('/', async (req, res) => {
    try {
        const team = new Team_1.default(req.body);
        await team.save();
        await team.populate('leader members');
        res.status(201).json({ message: 'Team created', data: team });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create team' });
    }
});
// PUT update team
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const team = await Team_1.default.findByIdAndUpdate(id, req.body, { new: true }).populate('leader members');
        if (!team) {
            return res.status(404).json({ message: `Team ${id} not found` });
        }
        res.json({ message: `Team ${id} updated`, data: team });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update team' });
    }
});
// DELETE team
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const team = await Team_1.default.findByIdAndDelete(id);
        if (!team) {
            return res.status(404).json({ message: `Team ${id} not found` });
        }
        res.status(204).json({ message: `Team ${id} deleted` });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete team' });
    }
});
exports.default = router;
//# sourceMappingURL=teams.js.map