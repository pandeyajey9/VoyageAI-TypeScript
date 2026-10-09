import useAuthStore from "../store/authStore";
import loginPagebg from "../assets/loginpagebg4.avif";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllTrips } from "../services/tripService.js";
import Navbar from "../components/Navbar.jsx";
import {
  getRandomDestinations,
  getTrendingDestinations,
} from "../data/destination.js";
import DestinationCard from "../components/DestinationCard.jsx";
import { getFavourites } from "../services/favouriteService.js";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favourites, setFavourites] = useState([]);
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await getAllTrips(token);
        setTrips(data.trips);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const data = await getFavourites(token);

        setFavourites(data.favourites.map((fav) => fav.destinationId));
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchFavourites();
  }, []);

  const sections = [
    { title: " Trending Destinations", key: "trending" },
    { title: " Mountains", key: "mountains" },
    { title: " Beaches", key: "beaches" },
    { title: " Heritage", key: "heritage" },
    { title: " Spiritual", key: "spiritual" },
    { title: " Nature", key: "nature" },
  ];
  const [places, setPlaces] = useState({
    trending: [],
    mountains: [],
    beaches: [],
    heritage: [],
    spiritual: [],
    nature: [],
  });

  useEffect(() => {
    setPlaces({
      trending: getTrendingDestinations(),
      mountains: getRandomDestinations("mountains"),
      beaches: getRandomDestinations("beaches"),
      heritage: getRandomDestinations("heritage"),
      spiritual: getRandomDestinations("spiritual"),
      nature: getRandomDestinations("nature"),
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className=" relative min-h-screen w-full flex flex-col items-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${loginPagebg})`,
        }}
      />
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="sticky top-0 z-20 w-full">
        <Navbar />
      </div>

      <div className="w-full max-w-8xl px-10 py-5 flex flex-col items-center relative z-10">
        <div className="text-center my-8 text-white">
          <h1 className="text-[clamp(24px,4vw,38px)] font-bold bg-linear-to-r from-sky-400 to-white bg-clip-text text-transparent drop-shadow-md">
            Welcome {user?.name}
          </h1>

          <p className="mt-6 text-[clamp(12px,1.2vw,16px)] font-bold bg-linear-to-r from-sky-400 to-white bg-clip-text text-transparent drop-shadow-md">
            Meet your AI Travel Assistant — get smart travel suggestions, ideas
            &amp; recommendations.
          </p>

          <button
            onClick={() => navigate("/ai-assistant")}
            className="mt-4 bg-black/60 hover:bg-sky-950/40 border border-sky-700/90 hover:border-sky-500 px-4 py-2 rounded-xl text-[clamp(10px,1.2vw,14px)] font-medium text-white transition-all duration-300"
          >
            Ask AI ⚡
          </button>
        </div>

        <div className="w-full space-y-12">
          {sections.map((section) => (
            <section key={section.key} className="mt-12">
              <h2 className="text-[22px] font-bold text-white mb-6">
                {section.title}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {places[section.key].map((place) => (
                  <DestinationCard
                    key={place.id}
                    destination={place}
                    isInitiallyFavourite={favourites.includes(place.id)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-22 w-full">
          <div className="bg-black/20 rounded-2xl p-6 text-center backdrop-blur-m">
            <h3 className="text-3xl font-bold text-sky-400">{trips.length}</h3>
            <p className="text-white mt-2">Total Plans</p>
          </div>

          <div className="bg-black/20 rounded-2xl p-6 text-center backdrop-blur-m">
            <h3 className="text-3xl font-bold text-green-400">AI</h3>
            <p className="text-white mt-2">Journey Planner</p>
          </div>

          <div className="bg-black/20 rounded-2xl p-6 text-center backdrop-blur-m">
            <h3 className="text-3xl font-bold text-yellow-400">24×7</h3>
            <p className="text-white mt-2">Assistant</p>
          </div>

          <div className="bg-black/20 rounded-2xl p-6 text-center backdrop-blur-m">
            <h3 className="text-3xl font-bold text-pink-400">Smart</h3>
            <p className="text-white mt-2">Recommendations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
