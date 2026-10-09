import {
  createTripService,
  getAllTripsService,
  getTripByIdService,
  updateTripService,
  deleteTripService,
  generateTripItineraryService,
} from "../services/tripService.js";

export const createTrip = async (req, res) => {
  try {
    const result = await createTripService(req.body, req.userId);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllTrips = async (req, res) => {
  try {
    const result = await getAllTripsService(req.userId);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getTripById = async (req, res) => {
  try {
    const result = await getTripByIdService(req.params.id, req.userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateTrip = async (req, res) => {
  try {
    const result = await updateTripService(req.params.id, req.userId, req.body);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteTrip = async (req, res) => {
  try {
    const result = await deleteTripService(req.params.id, req.userId);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const generateTripItinerary = async (req, res) => {
  try {
    const trip = await generateTripItineraryService(req.params.id, req.userId);

    res.status(200).json({
      message: "Itinerary generated",
      trip,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
