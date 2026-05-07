import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMassSchedule extends Document {
  parish_name: string;
  address: string;
  city: string;
  country: string;
  contact_info?: string;
  weekday_masses: string[];
  sunday_masses: string[];
  confession_times: string[];
  latitude?: number;
  longitude?: number;
}

const MassScheduleSchema = new Schema<IMassSchedule>({
  parish_name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  contact_info: { type: String },
  weekday_masses: [{ type: String }],
  sunday_masses: [{ type: String }],
  confession_times: [{ type: String }],
  latitude: { type: Number },
  longitude: { type: Number }
}, { timestamps: true });

const MassSchedule: Model<IMassSchedule> = mongoose.models.MassSchedule || mongoose.model<IMassSchedule>("MassSchedule", MassScheduleSchema);
export default MassSchedule;
