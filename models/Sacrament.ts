import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISacrament extends Document {
  name: string;
  number: number; // 1-7
  explanation: string;
  steps: string[];
  theological_meaning: string;
  bible_references: string[];
  minister?: string;
  recipient?: string;
  effects: string[];
  slug: string;
}

const SacramentSchema = new Schema<ISacrament>(
  {
    name: { type: String, required: true, trim: true },
    number: { type: Number, required: true, min: 1, max: 7 },
    explanation: { type: String, required: true },
    steps: [{ type: String }],
    theological_meaning: { type: String, required: true },
    bible_references: [{ type: String }],
    minister: { type: String },
    recipient: { type: String },
    effects: [{ type: String }],
    slug: { type: String, required: true, unique: true, lowercase: true },
  },
  { timestamps: true }
);

SacramentSchema.index({ slug: 1 });
SacramentSchema.index({ number: 1 });

const Sacrament: Model<ISacrament> = mongoose.models.Sacrament || mongoose.model<ISacrament>("Sacrament", SacramentSchema);
export default Sacrament;
