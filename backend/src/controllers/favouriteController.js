import {
  addFavouriteService,
  getFavouritesService,
  removeFavouriteService,
} from "../services/favouriteService.js";

export const addFavourite = async (req, res) => {
  try {
    const { destinationId } = req.body;
    const favourite = await addFavouriteService(req.userId, destinationId);

    res.status(201).json({
      success: true,
      message: "Added to favourite",
      favourite,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getFavourites = async (req, res) => {
  try {
    const favourites = await getFavouritesService(req.userId);

    res.status(200).json({
      success: true,
      favourites,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeFavourite = async (req, res) => {
  try {
    const { destinationId } = req.params;

    await removeFavouriteService(req.userId, Number(destinationId));

    res.status(200).json({
      success: true,
      message: "Removed from favourites",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
