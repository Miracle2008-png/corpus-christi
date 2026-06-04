import mongoose, { Schema, Document, Model } from "mongoose";

export interface IHymn extends Document {
  title: string;
  slug: string;
  latin_title?: string;
  author?: string;
  meter?: string;
  category: "marian" | "eucharistic" | "advent" | "lent" | "easter" | "general" | "holy-spirit" | "saints";
  lyrics: {
    stanza: number;
    latin_text?: string;
    english_text: string;
  }[];
  history?: string;
}

const HymnSchema = new Schema<IHymn>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    latin_title: { type: String },
    author: { type: String },
    meter: { type: String },
    category: {
      type: String,
      enum: ["marian", "eucharistic", "advent", "lent", "easter", "general", "holy-spirit", "saints"],
      required: true,
    },
    lyrics: [
      {
        stanza: { type: Number, required: true },
        latin_text: { type: String },
        english_text: { type: String, required: true },
      }
    ],
    history: { type: String },
  },
  { timestamps: true }
);

HymnSchema.index({ title: "text", "lyrics.english_text": "text" });
HymnSchema.index({ category: 1 });
HymnSchema.index({ slug: 1 });

const Hymn: Model<IHymn> = mongoose.models.Hymn || mongoose.model<IHymn>("Hymn", HymnSchema);
export default Hymn;
