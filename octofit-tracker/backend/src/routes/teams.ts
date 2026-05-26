import { Router, Request, Response } from 'express';
import Team from '../models/Team';

const router = Router();

// GET all teams
router.get('/', async (req: Request, res: Response) => {
  try {
    const teams = await Team.find().populate('leader members');
    res.json({ message: 'Get all teams', data: teams });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

// GET team by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id).populate('leader members');
    if (!team) {
      return res.status(404).json({ message: `Team ${id} not found` });
    }
    res.json({ message: `Get team ${id}`, data: team });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team' });
  }
});

// POST create new team
router.post('/', async (req: Request, res: Response) => {
  try {
    const team = new Team(req.body);
    await team.save();
    await team.populate('leader members');
    res.status(201).json({ message: 'Team created', data: team });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create team' });
  }
});

// PUT update team
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await Team.findByIdAndUpdate(id, req.body, { new: true }).populate('leader members');
    if (!team) {
      return res.status(404).json({ message: `Team ${id} not found` });
    }
    res.json({ message: `Team ${id} updated`, data: team });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update team' });
  }
});

// DELETE team
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await Team.findByIdAndDelete(id);
    if (!team) {
      return res.status(404).json({ message: `Team ${id} not found` });
    }
    res.status(204).json({ message: `Team ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete team' });
  }
});

export default router;
