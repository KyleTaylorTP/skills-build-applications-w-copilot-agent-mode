import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboard extends Document {
  userId: mongoose.Types.ObjectId;
  teamId?: mongoose.Types.ObjectId;
  rank: number;
  totalCalories: number;
  totalDistance: number;
  totalDuration: number;
  activitiesCount: number;
  period: string;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
    },
    rank: {
      type: Number,
      required: true,
    },
    totalCalories: {
      type: Number,
      default: 0,
    },
    totalDistance: {
      type: Number,
      default: 0,
    },
    totalDuration: {
      type: Number,
      default: 0,
    },
    activitiesCount: {
      type: Number,
      default: 0,
    },
    period: {
      type: String,
      enum: ['week', 'month', 'year', 'all-time'],
      default: 'all-time',
    },
  },
  { timestamps: true }
);

export default mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);
