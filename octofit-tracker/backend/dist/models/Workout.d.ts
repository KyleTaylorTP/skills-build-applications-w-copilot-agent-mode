import mongoose, { Document } from 'mongoose';
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
declare const _default: mongoose.Model<IWorkout, {}, {}, {}, mongoose.Document<unknown, {}, IWorkout, {}, mongoose.DefaultSchemaOptions> & IWorkout & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IWorkout>;
export default _default;
//# sourceMappingURL=Workout.d.ts.map