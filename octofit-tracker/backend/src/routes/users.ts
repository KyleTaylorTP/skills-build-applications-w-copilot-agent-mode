import { Router, Request, Response } from 'express';
import User from '../models/User';

const router = Router();

// GET all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.json({ message: 'Get all users', data: users });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// GET user by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password');
    if (!user) {
      return res.status(404).json({ message: `User ${id} not found` });
    }
    res.json({ message: `Get user ${id}`, data: user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// POST create new user
router.post('/', async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'User created', data: user });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user' });
  }
});

// PUT update user
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true }).select('-password');
    if (!user) {
      return res.status(404).json({ message: `User ${id} not found` });
    }
    res.json({ message: `User ${id} updated`, data: user });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update user' });
  }
});

// DELETE user
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: `User ${id} not found` });
    }
    res.status(204).json({ message: `User ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;
