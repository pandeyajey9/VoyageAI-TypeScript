import { useEffect, useState } from "react";
import { getDestinationImage } from "../services/destinationService.js";
import { Heart } from "lucide-react";
import useAuthStore from "../store/authStore.js";
import { addFavourite, removeFavourite } from "../services/favouriteService.js";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const DestinationCard = ({
  destination,
  isInitiallyFavourite,
  onFavouriteRemoved,
}) => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const token = useAuthStore((state) => state.token);
  const [isFavourite, setIsFavourite] = useState(isInitiallyFavourite);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const img = await getDestinationImage(destination.name);
        setImage(img);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadImage();
  }, [destination.name]);

  const handleFavourite = async () => {
    try {
      if (isFavourite) {
        await removeFavourite(destination.id, token);
        toast.success("Removed from favourites");
        if (onFavouriteRemoved) {
          onFavouriteRemoved(destination.id);
        }
      } else {
        await addFavourite(destination.id, token);
        toast.success("Added to favourites");
      }
      setIsFavourite(!isFavourite);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setIsFavourite(isInitiallyFavourite);
  }, [isInitiallyFavourite]);

  return (
    <div
      className="relative overflow-hidden shadow-lg hover:bg-gray-950/90 hover:scale-101
            transition-all duration-300 ease-in-out rounded-2xl card hover:shadow-sky-500/20 bg-black/70 backdrop-blur-lg text-white border border-sky-400/40 flex flex-col h-full justify-between"
    >
      {loading ? (
        <div className="h-52 flex items-center justify-center text-white">
          Loading...
        </div>
      ) : (
        <img
          src={image}
          alt={destination.name}
          className="w-full h-60 object-cover p-4 rounded-3xl "
        />
      )}

      <button
        onClick={handleFavourite}
        className="absolute top-3 right-3 h-10 w-10 rounded-full
             bg-black/10 backdrop-blur-md
             flex items-center justify-center"
      >
        <Heart
          size={22}
          fill={isFavourite ? "#ef4444" : "transparent"}
          color="white"
          strokeWidth={2.5}
        />
      </button>
      <div className="p-4 mt-0.5 text-white">
        <div className="flex justify-between">
          <h2 className=" flex text-sm mt-1 gap-1 font-bold">
            {destination.name}
          </h2>
          <div>⭐ {destination.rating}</div>
        </div>

        <p className="text-gray-300 flex items-center gap-2 mt-2 text-sm">
          {destination.state}
        </p>

        <p className="mt-2 text-sm text-gray-300 line-clamp-2">
          {destination.shortDescription}
        </p>

        <Link
          to="/create-trip"
          className="flex items-center justify-center bg-black/60 hover:bg-sky-950/40 border border-sky-700/90 hover:border-sky-500 px-2.5 py-1.5 rounded-md text-[12px] sm:text-[13px] font-medium text-white transition-all duration-300 whitespace-nowrap mt-3"
        >
          Plan This Trip
        </Link>
      </div>
    </div>
  );
};

export default DestinationCard;
