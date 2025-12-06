import mongoose, { Schema, model } from "mongoose";

const NotificationSchema = new Schema({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  message: { type: String, required: true },
  meta: { type: Schema.Types.Mixed },
  read: { type: Boolean, default: false },
  readAt: { type: Date, default: null }, 
}, { timestamps: true });

// TTL index: automatically delete notifications 3 days after readAt
NotificationSchema.index({ readAt: 1 }, { expireAfterSeconds: 3 * 24 * 60 * 60 });

export default mongoose.models.Notifications || model("Notifications", NotificationSchema);
