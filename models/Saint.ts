import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISaint extends Document {
  name: string;
  biography_long: string;
  birth_date?: string;
  death_date?: string;
  feast_day?: string;
  canonization_date?: string;
  canonized_by_pope?: string;
  known_for: string;
  miracles: string[];
  patron_of: string[];
  quotes: string[];
  category: "martyr" | "doctor" | "confessor" | "virgin" | "bishop" | "apostle" | "pope" | "other";
  image_url?: string;
  slug: string;
}

const SaintSchema = new Schema<ISaint>(
  {
    name: { type: String, required: true, trim: true },
    biography_long: { type: String, required: true },
    birth_date: { type: String },
    death_date: { type: String },
    feast_day: { type: String },
    canonization_date: { type: String },
    canonized_by_pope: { type: String },
    known_for: { type: String, required: true },
    miracles: [{ type: String }],
    patron_of: [{ type: String }],
    quotes: [{ type: String }],
    category: {
      type: String,
      enum: ["martyr", "doctor", "confessor", "virgin", "bishop", "apostle", "pope", "other"],
      required: true,
    },
    image_url: { type: String },
    slug: { type: String, required: true, unique: true, lowercase: true },
  },
  { timestamps: true }
);

SaintSchema.index({ name: "text", known_for: "text", patron_of: "text" });
SaintSchema.index({ category: 1 });
SaintSchema.index({ slug: 1 });

const Saint: Model<ISaint> = mongoose.models.Saint || mongoose.model<ISaint>("Saint", SaintSchema);
export default Saint;
