import mongoose, { Document, Model } from "mongoose";

export interface ISaintBio extends Document {
  name: string;
  feastDay: string;
  patronage: string;
  biography: string;
  createdAt: Date;
}

const SaintBioSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    feastDay: { type: String, required: true },
    patronage: { type: String, required: true },
    biography: { type: String, required: true },
  },
  { timestamps: true }
);

// Indexes
SaintBioSchema.index({ name: 1 });

const SaintBio: Model<ISaintBio> = mongoose.models.SaintBio || mongoose.model<ISaintBio>("SaintBio", SaintBioSchema);
export default SaintBio;
