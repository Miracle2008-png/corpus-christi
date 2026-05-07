import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILibraryBook extends Document {
  title: string;
  author: string;
  category: string;
  description?: string;
  content: string; // Markdown or long text
  image_url?: string;
  published_year?: number;
  slug: string;
  featured?: boolean;
}

const LibraryBookSchema = new Schema<ILibraryBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  content: { type: String, required: true },
  image_url: { type: String },
  published_year: { type: Number },
  slug: { type: String, required: true, unique: true },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

const LibraryBook: Model<ILibraryBook> = mongoose.models.LibraryBook || mongoose.model<ILibraryBook>("LibraryBook", LibraryBookSchema);
export default LibraryBook;
