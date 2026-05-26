import { Router, Request, Response } from 'express';
import Workout from '../models/Workout';

const router = Router();

// GET all workouts
router.get('/', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find().populate('userId');
    res.json({ message: 'Get all workouts', data: workouts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

// GET workout by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findById(id).populate('userId');
    if (!workout) {
      return res.status(404).json({ message: `Workout ${id} not found` });
    }
    res.json({ message: `Get workout ${id}`, data: workout });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
});

// POST create new workout
router.post('/', async (req: Request, res: Response) => {
  try {
    const workout = new Workout(req.body);
    await workout.save();
    await workout.populate('userId');
    res.status(201).json({ message: 'Workout created', data: workout });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create workout' });
  }
});

// PUT update workout
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findByIdAndUpdate(id, req.body, { new: true }).populate('userId');
    if (!workout) {
      return res.status(404).json({ message: `Workout ${id} not found` });
    }
    res.json({ message: `Workout ${id} updated`, data: workout });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update workout' });
  }
});

// DELETE workout
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findByIdAndDelete(id);
    if (!workout) {
      return res.status(404).json({ message: `Workout ${id} not found` });
    }
    res.status(204).json({ message: `Workout ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workout' });
  }
});

export default router;
