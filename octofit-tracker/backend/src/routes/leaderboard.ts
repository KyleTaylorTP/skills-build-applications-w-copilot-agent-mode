import { Router, Request, Response } from 'express';
import Leaderboard from '../models/Leaderboard';

const router = Router();

// GET leaderboard rankings
router.get('/', async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find()
      .sort({ rank: 1 })
      .populate('userId teamId')
      .limit(100);
    res.json({ message: 'Get leaderboard', data: leaderboard });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// GET leaderboard for specific team
router.get('/team/:teamId', async (req: Request, res: Response) => {
  try {
    const { teamId } = req.params;
    const leaderboard = await Leaderboard.find({ teamId })
      .sort({ rank: 1 })
      .populate('userId teamId');
    res.json({ message: `Get leaderboard for team ${teamId}`, data: leaderboard });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team leaderboard' });
  }
});

// GET leaderboard for specific period
router.get('/period/:period', async (req: Request, res: Response) => {
  try {
    const { period } = req.params;
    const leaderboard = await Leaderboard.find({ period })
      .sort({ rank: 1 })
      .populate('userId teamId')
      .limit(100);
    res.json({ message: `Get leaderboard for ${period}`, data: leaderboard });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard for period' });
  }
});

export default router;
