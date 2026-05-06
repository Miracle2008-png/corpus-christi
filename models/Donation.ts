import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDonation extends Document {
  donor_name: string;
  email: string;
  amount: number;
  purpose: string;
  reference: string;
  status: "success" | "pending" | "failed";
  createdAt: Date;
}

const DonationSchema = new Schema<IDonation>(
  {
    donor_name: { type: String, required: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true }, // Amount in NGN
    purpose: { type: String, required: true },
    reference: { type: String, required: true, unique: true },
    status: { type: String, enum: ["success", "pending", "failed"], default: "success" },
  },
  { timestamps: true }
);

const Donation: Model<IDonation> = mongoose.models.Donation || mongoose.model<IDonation>("Donation", DonationSchema);

export default Donation;
