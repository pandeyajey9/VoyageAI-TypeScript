import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import { getFavourites } from "../services/favouriteService";
import DestinationCard from "../components/DestinationCard";
import { destinations } from "../data/destination";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import loginPagebg from "../assets/loginpagebg4.avif";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
const Favourites = () => {
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [favouritePlaces, setFavouritePlaces] = useState([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const data = await getFavourites(token);
        const allDestinations = Object.values(destinations).flat();
        const favouriteData = data.favourites
          .map((fav) =>
            allDestinations.find((place) => place.id === fav.destinationId),
          )
          .filter(Boolean);
        setFavouritePlaces(favouriteData);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className=" relative min-h-screen w-full flex flex-col items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${loginPagebg})`,
          }}
        />
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="sticky top-0 z-20 w-full">
          <Navbar />
        </div>

        <div className="w-full max-w-8xl mx-auto px-10 py-8 relative z-10">
          {favouritePlaces.length > 0 && (
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-[20px] sm:text-xl md:text-2xl font-bold text-white">
                Favourite Destinations
              </h1>
              
              <span><BackButton/></span>
              
            </div>
          )}

          {favouritePlaces.length === 0 ? (
            
             <div>
              <BackButton/>
              <div className="text-center text-blue-100 mt-20">
                <h2 className="text-3xl font-bold">
                  No Favourite Destinations Yet ❤️
                </h2>

                <p className="mt-3 text-gray-300">
                  Explore destinations and tap the heart icon to save them.
                </p>
              </div>
            </div> 
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {favouritePlaces.map((place) => (
                <DestinationCard
                  key={place.id}
                  destination={place}
                  isInitiallyFavourite={true}
                  onFavouriteRemoved={(id) => {
                    setFavouritePlaces((prev) =>
                      prev.filter((place) => place.id !== id),
                    );
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Favourites;
