import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  password_hash?: string;
  role: "admin" | "user";
  authProvider?: string;
  bookmarks: {
    saints: mongoose.Types.ObjectId[];
    prayers: mongoose.Types.ObjectId[];
    readings: mongoose.Types.ObjectId[];
    miracles: mongoose.Types.ObjectId[];
  };
  createdAt: Date;
  lastLogin: Date;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name:         { type: String, required: true, trim: true, maxlength: 100 },
    email:        { type: String, required: true, unique: true, lowercase: true, trim: true },
    password_hash:{ type: String, required: false, select: false },
    role:         { type: String, enum: ["admin", "user"], default: "user" },
    authProvider: { type: String, default: "credentials" },
    bookmarks: {
      saints:   [{ type: Schema.Types.ObjectId, ref: "Saint" }],
      prayers:  [{ type: Schema.Types.ObjectId, ref: "Prayer" }],
      readings: [{ type: Schema.Types.ObjectId, ref: "Reading" }],
      miracles: [{ type: Schema.Types.ObjectId, ref: "Miracle" }],
    },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

// NOTE: Password hashing is handled in the API route (register/route.ts) with bcrypt.hash()
// This avoids Mongoose pre-save middleware TypeScript overload conflicts in strict mode.

UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password_hash);
};

UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
