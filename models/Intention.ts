import mongoose, { Schema, Document } from "mongoose";

export interface IIntention extends Document {
  user_id?: mongoose.Types.ObjectId;
  author_name: string;
  title: string;
  description: string;
  prayer_count: number;
  prayed_by: string[]; // array of emails or user ids who prayed
  created_at: Date;
}

const IntentionSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: false },
    author_name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    prayer_count: { type: Number, default: 0 },
    prayed_by: [{ type: String }],
    created_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Intention || mongoose.model<IIntention>("Intention", IntentionSchema);
