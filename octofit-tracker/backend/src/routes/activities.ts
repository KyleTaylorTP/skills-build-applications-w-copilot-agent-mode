import { Router, Request, Response } from 'express';
import Activity from '../models/Activity';

const router = Router();

// GET all activities
router.get('/', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('userId teamId');
    res.json({ message: 'Get all activities', data: activities });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// GET activity by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id).populate('userId teamId');
    if (!activity) {
      return res.status(404).json({ message: `Activity ${id} not found` });
    }
    res.json({ message: `Get activity ${id}`, data: activity });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
});

// POST log new activity
router.post('/', async (req: Request, res: Response) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    await activity.populate('userId teamId');
    res.status(201).json({ message: 'Activity logged', data: activity });
  } catch (error) {
    res.status(400).json({ error: 'Failed to log activity' });
  }
});

// PUT update activity
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByIdAndUpdate(id, req.body, { new: true }).populate('userId teamId');
    if (!activity) {
      return res.status(404).json({ message: `Activity ${id} not found` });
    }
    res.json({ message: `Activity ${id} updated`, data: activity });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update activity' });
  }
});

// DELETE activity
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByIdAndDelete(id);
    if (!activity) {
      return res.status(404).json({ message: `Activity ${id} not found` });
    }
    res.status(204).json({ message: `Activity ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity' });
  }
});

export default router;
