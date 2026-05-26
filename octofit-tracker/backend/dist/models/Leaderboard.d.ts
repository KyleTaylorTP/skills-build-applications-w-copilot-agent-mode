import mongoose, { Document } from 'mongoose';
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
declare const _default: mongoose.Model<ILeaderboard, {}, {}, {}, mongoose.Document<unknown, {}, ILeaderboard, {}, mongoose.DefaultSchemaOptions> & ILeaderboard & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ILeaderboard>;
export default _default;
//# sourceMappingURL=Leaderboard.d.ts.map