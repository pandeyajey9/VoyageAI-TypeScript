import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    source: {
      type: String,
      trim: true,
      required: true,
    },

    destination: {
      type: String,
      required: true,
      trim: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    travelers: {
      type: Number,
      required: true,
      min: 1,
    },

    travelMode: {
      type: String,
      enum: ["Flight", "Train", "Bus", "Car"],
      required: true,
    },

    budget: {
      type: Number,
      required: true,
    },

    itinerary: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

const Trip = mongoose.model("Trip", tripSchema);
export default Trip;
