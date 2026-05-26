import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  type: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  exercises: string[];
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      required: true,
      enum: ['cardio', 'strength', 'flexibility', 'balance', 'mixed'],
    },
    duration: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'intermediate',
    },
    exercises: [
      {
        type: String,
      },
    ],
    notes: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export default mongoose.model<IWorkout>('Workout', workoutSchema);
