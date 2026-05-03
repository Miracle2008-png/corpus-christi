import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMiracle extends Document {
  title: string;
  description: string;
  location?: string;
  date?: string;
  verified_by?: string;
  historical_source?: string;
  saint_associated?: string;
  category: "eucharistic" | "healing" | "apparition" | "incorruptibility" | "other";
  image_url?: string;
  slug: string;
}

const MiracleSchema = new Schema<IMiracle>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    location: { type: String },
    date: { type: String },
    verified_by: { type: String },
    historical_source: { type: String },
    saint_associated: { type: String },
    category: {
      type: String,
      enum: ["eucharistic", "healing", "apparition", "incorruptibility", "other"],
      default: "other",
    },
    image_url: { type: String },
    slug: { type: String, required: true, unique: true, lowercase: true },
  },
  { timestamps: true }
);

MiracleSchema.index({ title: "text", description: "text" });
MiracleSchema.index({ category: 1 });

const Miracle: Model<IMiracle> = mongoose.models.Miracle || mongoose.model<IMiracle>("Miracle", MiracleSchema);
export default Miracle;
