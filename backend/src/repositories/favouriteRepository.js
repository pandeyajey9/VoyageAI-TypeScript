import Favourite from "../models/Favourite.js";

export const createFavourite = async (data) => {
  return await Favourite.create(data);
};

export const getUserFavourites = async (userId) => {
  return await Favourite.find({userId});
};

export const findFavourite = async (userId, destinationId) => {
  return await Favourite.findOne({
    userId,
    destinationId,
  });
};

export const deleteFavourite = async (userId, destinationId) => {
  return await Favourite.findOneAndDelete({ userId, destinationId });
};
