import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  teamId?: mongoose.Types.ObjectId;
  type: string;
  duration: number;
  distance?: number;
  calories: number;
  intensity: 'low' | 'moderate' | 'high';
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
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
    type: {
      type: String,
      required: true,
      enum: ['running', 'cycling', 'swimming', 'walking', 'gym', 'yoga', 'hiking', 'sports'],
    },
    duration: {
      type: Number,
      required: true,
    },
    distance: {
      type: Number,
    },
    calories: {
      type: Number,
      required: true,
    },
    intensity: {
      type: String,
      enum: ['low', 'moderate', 'high'],
      default: 'moderate',
    },
    description: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export default mongoose.model<IActivity>('Activity', activitySchema);
