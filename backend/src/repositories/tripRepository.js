import Trip from "../models/Trip.js";

export const createTrip = (tripData) => {
  return Trip.create(tripData);
};

export const findTripsByUserId = (userId) => {
  return Trip.find({ userId });
};

export const findTripById = (id) => {
  return Trip.findById(id);
};

export const updateTripById = (id, data) => {
  return Trip.findByIdAndUpdate(id, data, { new: true });
};

export const deleteTripById = (id) => {
  return Trip.findByIdAndDelete(id);
};

export const updateTripItinerary = (tripId, itinerary) => {
  return Trip.findByIdAndUpdate(
    tripId,
    { itinerary: itinerary },
    { new: true },
  );
};
