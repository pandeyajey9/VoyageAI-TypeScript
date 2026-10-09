const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

const imageCache = {};

export const getDestinationImage = async (destinationName) => {
  if (imageCache[destinationName]) {
    return imageCache[destinationName];
  }

  const response = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(destinationName)}&per_page=1`,
    {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch destination Image");
  }

  const data = await response.json();
  const image=data.photos.length>0? data.photos[0].src.large:null;
  imageCache[destinationName]=image;
  return image;
};
