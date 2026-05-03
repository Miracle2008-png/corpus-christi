import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPrayer extends Document {
  title: string;
  latin_text?: string;
  english_text: string;
  category: "rosary" | "mass" | "confession" | "general" | "novena" | "litany" | "chaplet";
  explanation?: string;
  occasion?: string;
  slug: string;
}

const PrayerSchema = new Schema<IPrayer>(
  {
    title: { type: String, required: true, trim: true },
    latin_text: { type: String },
    english_text: { type: String, required: true },
    category: {
      type: String,
      enum: ["rosary", "mass", "confession", "general", "novena", "litany", "chaplet"],
      required: true,
    },
    explanation: { type: String },
    occasion: { type: String },
    slug: { type: String, required: true, unique: true, lowercase: true },
  },
  { timestamps: true }
);

PrayerSchema.index({ title: "text", english_text: "text" });
PrayerSchema.index({ category: 1 });
PrayerSchema.index({ slug: 1 });

const Prayer: Model<IPrayer> = mongoose.models.Prayer || mongoose.model<IPrayer>("Prayer", PrayerSchema);
export default Prayer;
