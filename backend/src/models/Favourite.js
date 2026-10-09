import mongoose from "mongoose";

const favouriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    destinationId: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

favouriteSchema.index({ userId: 1, destinationId: 1 }, { unique: true });

const Favourite = mongoose.model("Favourite", favouriteSchema);

export default Favourite;
