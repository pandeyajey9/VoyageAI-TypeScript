import {
  createTrip,
  findTripsByUserId,
  findTripById,
  updateTripById,
  deleteTripById,
  updateTripItinerary,
} from "../repositories/tripRepository.js";
import { generateTripPlan } from "./groqService.js";

export const createTripService = async (tripData, userId) => {
  const trip = await createTrip({
    userId,
    ...tripData,
  });

  return {
    message: "Trip Created Successfully",
    trip,
  };
};

export const getAllTripsService = async (userId) => {
  const trips = await findTripsByUserId(userId);

  return {
    trips,
  };
};

export const getTripByIdService = async (tripId, userId) => {
  const trip = await findTripById(tripId);

  if (!trip) {
    throw new Error("Trip Not Found");
  }

  if (trip.userId.toString() !== userId) {
    throw new Error("Access Denied");
  }

  return {
    trip,
  };
};

export const updateTripService = async (tripId, userId, data) => {
  const trip = await findTripById(tripId);

  if (!trip) {
    throw new Error("Trip Not Found");
  }

  if (trip.userId.toString() !== userId) {
    throw new Error("Access Denied");
  }

  const updatedTrip = await updateTripById(tripId, data);

  return {
    message: "Trip Updated Successfully",
    trip: updatedTrip,
  };
};

export const deleteTripService = async (tripId, userId) => {
  const trip = await findTripById(tripId);

  if (!trip) {
    throw new Error("Journey Not Found");
  }

  if (trip.userId.toString() !== userId) {
    throw new Error("Access Denied");
  }

  await deleteTripById(tripId);

  return {
    message: "Journey Deleted Successfully",
  };
};

export const generateTripItineraryService = async (tripId, userId) => {
  const trip = await findTripById(tripId);

  if (!trip) {
    throw new Error("Trip not found");
  }

  if (trip.userId.toString() !== userId) {
    throw new Error("Access Denied");
  }
  if (trip.itinerary) {
    return trip;
  }
  const itinerary = await generateTripPlan(trip);

  const updatedTrip = await updateTripItinerary(tripId, itinerary);

  return updatedTrip;
};
