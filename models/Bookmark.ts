import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBookmark extends Document {
  user_email: string;
  item_type: string; // e.g. "prayer", "library", "saint"
  item_id: string;   // the slug or ID
  item_title: string;
  item_url: string;
}

const BookmarkSchema = new Schema<IBookmark>({
  user_email: { type: String, required: true },
  item_type: { type: String, required: true },
  item_id: { type: String, required: true },
  item_title: { type: String, required: true },
  item_url: { type: String, required: true },
}, { timestamps: true });

// Prevent duplicate bookmarks for the same user and item
BookmarkSchema.index({ user_email: 1, item_type: 1, item_id: 1 }, { unique: true });

const Bookmark: Model<IBookmark> = mongoose.models.Bookmark || mongoose.model<IBookmark>("Bookmark", BookmarkSchema);
export default Bookmark;
