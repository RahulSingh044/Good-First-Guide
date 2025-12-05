import mongoose, { Schema, models } from "mongoose";

const BookmarkSchema = new Schema(
  {
    userId: { type: String, required: true },
    itemId: { type: String, required: true },
    title: { type: String },
    repository: { type: String, required: true },
    description: { type: String, required: true },
    stars: { type: Number, required: true },
    url: { type: String, required: true },
    isBookmarked: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  }
);

export default models.Bookmark || mongoose.model("Bookmark", BookmarkSchema);
