import mongoose, { Schema, Document, Model } from "mongoose";

export interface IReading extends Document {
  date: string; // ISO date string YYYY-MM-DD
  liturgical_season?: string;
  old_testament: {
    reference: string;
    text: string;
  };
  psalm: {
    reference: string;
    text: string;
    response?: string;
  };
  new_testament: {
    reference: string;
    text: string;
  };
  gospel: {
    reference: string;
    text: string;
  };
  gospel_reflection?: string;
}

const ReadingSchema = new Schema<IReading>(
  {
    date: { type: String, required: true, unique: true },
    liturgical_season: { type: String },
    old_testament: {
      reference: { type: String, required: true },
      text: { type: String, required: true },
    },
    psalm: {
      reference: { type: String, required: true },
      text: { type: String, required: true },
      response: { type: String },
    },
    new_testament: {
      reference: { type: String, required: true },
      text: { type: String, required: true },
    },
    gospel: {
      reference: { type: String, required: true },
      text: { type: String, required: true },
    },
    gospel_reflection: { type: String },
  },
  { timestamps: true }
);

ReadingSchema.index({ date: 1 });
ReadingSchema.index({ liturgical_season: 1 });

const Reading: Model<IReading> = mongoose.models.Reading || mongoose.model<IReading>("Reading", ReadingSchema);
export default Reading;
