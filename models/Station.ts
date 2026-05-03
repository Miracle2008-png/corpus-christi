import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStation extends Document {
  station_number: number;
  title: string;
  meditation_text: string;
  scripture_reference: string;
  scripture_text?: string;
  prayer?: string;
  image_url?: string;
}

const StationSchema = new Schema<IStation>(
  {
    station_number: { type: Number, required: true, min: 1, max: 14, unique: true },
    title: { type: String, required: true },
    meditation_text: { type: String, required: true },
    scripture_reference: { type: String, required: true },
    scripture_text: { type: String },
    prayer: { type: String },
    image_url: { type: String },
  },
  { timestamps: true }
);

StationSchema.index({ station_number: 1 });

const Station: Model<IStation> = mongoose.models.Station || mongoose.model<IStation>("Station", StationSchema);
export default Station;
