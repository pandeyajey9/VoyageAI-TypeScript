import useAuthStore from "../store/authStore";
import loginPagebg from "../assets/loginpagebg4.avif";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { deleteTrip, getAllTrips } from "../services/tripService";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

const GetAllTrips = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useAuthStore((state) => state.token);

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

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const handleDelete = async (tripId) => {
    try {
      const data = await deleteTrip(tripId, token);
      toast.success(data.message);
      setTrips((prevTrips) => prevTrips.filter((trip) => trip._id !== tripId));
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center">
      <div
        className="fixed inset-0 bg-cover bg-center -z-20"
        style={{
          backgroundImage: `url(${loginPagebg})`,
        }}
      />
      <div className="sticky top-0 z-20 w-full">
        <Navbar />
      </div>

      <div className="z-10 absolute inset-0 bg-black/40 border  p-6 shadow-2xl"></div>

        <BackButton/>
      <div className="z-10 w-full max-w-6xl p-6 flex flex-col items-center">
        <div className="mt-6 w-full">
          {trips.length === 0 ? (
            <div className=" mt-15 pl-3 [text-shadow:_0_0_8px_rgba(0,0,0,0.9),_0_0px_4px_rgba(0,0,0,0.9),_0_0_2px_rgba(0,0,0,1)] text-center text-blue-100 bg-black/30 backdrop-blur-m p-8 rounded-3xl border border-white/10">
              <h2 className="text-4xl font-semibold ">No Journey Yet ✈️</h2>
              <p className="mt-2 text-xl text-blue-100 ">
                Plan your first Journey.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.map((trip) => (
                <div
                  key={trip._id}
                  className="hover:bg-gray-950/50 hover:scale-102
            transition-all duration-300 ease-in-out rounded-2xl card bg-black/90 backdrop-blur-md text-white border border-sky-400/30 shadow-xl"
                >
                  <div className="card-body  items-center text-center">
                    <h2 className="card-title text-2xl font-bold text-sky-500 justify-center mb-3">
                      {trip.destination}
                    </h2>
                    <p className="text-base font-medium text-white/90 ">
                      {trip.source} → {trip.destination}
                    </p>
                    <p className="text-base font-medium text-white/90">
                      Budget: ₹{trip.budget}
                    </p>
                    <p className="text-base font-medium text-white/90">
                      Mode: {trip.travelMode}
                    </p>

                    <button
                      onClick={() => navigate(`/trip/${trip._id}`)}
                      className="btn w-full bg-black/60 hover:bg-sky-400/50 backdrop-blur-md border border-sky-400/50 hover:border-white-500/80 px-3 py-2 rounded-xl text-white transition-all duration-300 mt-3"
                    >
                      View AI Travel Plan →
                    </button>

                    <button
                      onClick={() =>
                        window.open("https://www.makemytrip.com", "_blank")
                      }
                      className="btn w-full bg-black/90 hover:bg-sky-500/40 backdrop-blur-md border border-sky-400/50 hover:border-blue-500/60 px-3 py-2 rounded-xl text-white transition-all duration-300 mt-1"
                    >
                      Book Flights, Trains & Hotels →
                    </button>
                    <button
                      className="btn w-full bg-black/90 hover:bg-red-950/30 backdrop-blur-md border border-sky-400/50 hover:border-red-500/90 px-3 py-2 rounded-xl text-white transition-all duration-300 mt-1"
                      onClick={() => handleDelete(trip._id)}
                    >
                      Remove Plan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetAllTrips;
