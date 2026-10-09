import {
  createFavourite,
  deleteFavourite,
  findFavourite,
  getUserFavourites,
} from "../repositories/favouriteRepository.js";

export const addFavouriteService = async (userId, destinationId) => {
  const alreadyExists = await findFavourite(userId, destinationId);

  if (alreadyExists) {
    throw new Error("Destination already in favourite");
  }

  return await createFavourite({
    userId,
    destinationId,
  });
};

export const getFavouritesService = async (userId) => {
  return await getUserFavourites(userId);
};

export const removeFavouriteService = async (userId, destinationId) => {
  const favourite = await findFavourite(userId, destinationId);

  if (!favourite) {
    throw new Error("Favourite not found");
  }

  return await deleteFavourite(userId, destinationId);
};
