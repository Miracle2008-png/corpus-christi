import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPope extends Document {
  papal_name: string;
  birth_name: string;
  birth_date?: string;
  death_date?: string;
  reign_start: string;
  reign_end?: string;
  nationality?: string;
  biography: string;
  major_events: string[];
  contributions: string[];
  image_url?: string;
  number?: number;
  slug: string;
}

const PopeSchema = new Schema<IPope>(
  {
    papal_name: { type: String, required: true, trim: true },
    birth_name: { type: String, required: true },
    birth_date: { type: String },
    death_date: { type: String },
    reign_start: { type: String, required: true },
    reign_end: { type: String },
    nationality: { type: String },
    biography: { type: String, required: true },
    major_events: [{ type: String }],
    contributions: [{ type: String }],
    image_url: { type: String },
    number: { type: Number },
    slug: { type: String, required: true, unique: true, lowercase: true },
  },
  { timestamps: true }
);

PopeSchema.index({ papal_name: "text", birth_name: "text" });
PopeSchema.index({ slug: 1 });

const Pope: Model<IPope> = mongoose.models.Pope || mongoose.model<IPope>("Pope", PopeSchema);
export default Pope;
