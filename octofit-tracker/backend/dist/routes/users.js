"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User_1.default.find().select('-password');
        res.json({ message: 'Get all users', data: users });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});
// GET user by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User_1.default.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({ message: `User ${id} not found` });
        }
        res.json({ message: `Get user ${id}`, data: user });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});
// POST create new user
router.post('/', async (req, res) => {
    try {
        const user = new User_1.default(req.body);
        await user.save();
        res.status(201).json({ message: 'User created', data: user });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create user' });
    }
});
// PUT update user
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User_1.default.findByIdAndUpdate(id, req.body, { new: true }).select('-password');
        if (!user) {
            return res.status(404).json({ message: `User ${id} not found` });
        }
        res.json({ message: `User ${id} updated`, data: user });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update user' });
    }
});
// DELETE user
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User_1.default.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: `User ${id} not found` });
        }
        res.status(204).json({ message: `User ${id} deleted` });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});
exports.default = router;
//# sourceMappingURL=users.js.map