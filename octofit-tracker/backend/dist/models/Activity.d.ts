import mongoose, { Document } from 'mongoose';
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
declare const _default: mongoose.Model<IActivity, {}, {}, {}, mongoose.Document<unknown, {}, IActivity, {}, mongoose.DefaultSchemaOptions> & IActivity & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IActivity>;
export default _default;
//# sourceMappingURL=Activity.d.ts.map