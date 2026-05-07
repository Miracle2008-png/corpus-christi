import mongoose, { Schema, Document, Model } from "mongoose";

export interface IHolySite extends Document {
  name: string;
  country: string;
  city: string;
  description: string;
  image_url?: string;
  significance: string;
  latitude: number;
  longitude: number;
  slug: string;
}

const HolySiteSchema = new Schema<IHolySite>({
  name: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  description: { type: String, required: true },
  image_url: { type: String },
  significance: { type: String, required: true }, // e.g., Marian Apparition, Eucharistic Miracle
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  slug: { type: String, required: true, unique: true }
}, { timestamps: true });

const HolySite: Model<IHolySite> = mongoose.models.HolySite || mongoose.model<IHolySite>("HolySite", HolySiteSchema);
export default HolySite;
