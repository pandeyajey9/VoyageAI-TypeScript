import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import { generateTripItinerary } from "../services/tripService";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import BackButton from "../components/BackButton";

const TripDetails = () => {
  const token = useAuthStore((state) => state.token);
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const handleTripDetails = async () => {
      try {
        setLoading(true);

        const tripData = await generateTripItinerary(id, token);
        
        const parsed = JSON.parse(tripData.trip.itinerary);

        setItinerary(parsed);

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    handleTripDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!itinerary) return null;
  return (
    <div className="sticky top-0 z-50  min-h-screen bg-[#000000] text-white">
      <div className="sticky top-0 z-20 w-full">
        <Navbar />
      </div>

      <BackButton/>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="rounded-3xl border border-sky-500/20 bg-white/5 backdrop-blur-xl p-6 shadow-2xl">
          <h1 className="text-3xl md:text-4xl font-bold">
            {itinerary.overview.destination} 
          </h1>

          <p className="mt-2 text-sm md:text-base text-slate-300">
            {itinerary.overview.tripType} Trip
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="rounded-2xl bg-slate-900/70 border border-sky-500/20 p-4">
              <p className="text-slate-400 text-sm">Duration</p>

              <h3 className="text-lg md:text-xl font-bold mt-2">
                {itinerary.overview.duration}
              </h3>
            </div>

            <div className="rounded-2xl bg-slate-900/70 border border-sky-500/20 p-4">
              <p className="text-slate-400 text-sm">Stay Area</p>

              <h3 className="text-lg md:text-xl font-bold mt-2">
                {itinerary.overview.stayArea}
              </h3>
            </div>

            <div className="rounded-2xl bg-slate-900/70 border border-sky-500/20 p-4">
              <p className="text-slate-400 text-sm">Best Season</p>

              <h3 className="text-lg md:text-xl font-bold mt-2">
                {itinerary.overview.bestSeason}
              </h3>
            </div>

            <div className="rounded-2xl bg-slate-900/70 border border-sky-500/20 p-4">
              <p className="text-slate-400 text-sm">Budget</p>

              <h3 className="text-lg md:text-xl font-bold mt-2 text-green-400">
                {itinerary.overview.estimatedBudget}
              </h3>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-5">Trip Highlights</h2>

          <div className="flex flex-wrap gap-3">
            {itinerary.highlights.map((item, index) => (
              <div
                key={index}
                className="
            px-5 py-2.5
            rounded-full
            bg-sky-500/20
            border border-sky-500/30
            text-sky-300
            font-medium
            text-sm
            hover:scale-105
            transition-all
            "
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-5">Best Places To Visit</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {itinerary.places.map((place, index) => (
              <div
                key={index}
                className="
        rounded-3xl
        bg-white/5
        border border-white/10
        backdrop-blur-xl
        p-5
        hover:border-sky-400/40
        hover:-translate-y-1
        transition-all
        shadow-lg
        "
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">{place.name}</h3>

                  <span
                    className="
          text-xs
          bg-sky-500/20
          text-sky-300
          px-3
          py-1
          rounded-full
          "
                  >
                    {place.bestTime}
                  </span>
                </div>

                <p className="text-slate-300 text-sm mt-3">
                  {place.description}
                </p>

                <div className="mt-5 space-y-2 text-sm text-slate-300">
                  <p>
                    🎫 Entry Fee:
                    <span className="text-white ml-2">{place.entryFee}</span>
                  </p>

                  <p>
                    ⏱ Time Required:
                    <span className="text-white ml-2">{place.visitTime}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-5">Local Food To Try</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {itinerary.food.map((food, index) => (
              <div
                key={index}
                className="
        rounded-3xl
        bg-white/5
        border border-white/10
        backdrop-blur-xl
        p-5
        hover:border-orange-400/40
        hover:-translate-y-1
        transition-all
        shadow-lg
        "
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{food.dish}</h3>

                  <span
                    className="
          bg-orange-500/20
          text-orange-300
          px-3
          py-1
          rounded-full
          text-sm
          "
                  >
                    🍴 Must Try
                  </span>
                </div>

                <div className="mt-5 space-y-3 text-sm">
                  <p className="text-slate-400">Famous Place</p>

                  <p className="text-white font-medium">📍 {food.place}</p>

                  <p className="text-slate-400 mt-3">Approx Price</p>

                  <p className="text-green-400 font-semibold">{food.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-5">Best Areas To Stay</h2>

          <div className="grid md:grid-cols-2 gap-5">
            {itinerary.stay.map((stay, index) => (
              <div
                key={index}
                className="
        rounded-3xl
        bg-white/5
        border border-white/10
        backdrop-blur-xl
        p-6
        hover:border-purple-400/40
        hover:-translate-y-1
        transition-all
        shadow-lg
        "
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">{stay.area}</h3>

                  <span
                    className="
          bg-purple-500/20
          text-purple-300
          px-3 py-1
          rounded-full
          text-sm
          "
                  >
                    Stay
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  <div>
                    <p className="text-sm text-slate-400">Budget Per Night</p>

                    <p className="text-xl font-bold text-green-400">
                      {stay.pricePerNight}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-400">Recommended For</p>

                    <p className="text-white font-medium">👥 {stay.bestFor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-5"> Budget Breakdown</h2>

          <div
            className="
  rounded-3xl
  bg-white/5
  border border-white/10
  backdrop-blur-xl
  p-6
  shadow-lg
  "
          >
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-slate-900/70 rounded-2xl p-4 border border-white/10">
                <p className="text-slate-400 text-sm">✈️ Travel</p>

                <h3 className="text-xl font-bold mt-2">
                  {itinerary.budget.travel}
                </h3>
              </div>

              <div className="bg-slate-900/70 rounded-2xl p-4 border border-white/10">
                <p className="text-slate-400 text-sm">🏨 Hotel</p>

                <h3 className="text-xl font-bold mt-2">
                  {itinerary.budget.hotel}
                </h3>
              </div>

              <div className="bg-slate-900/70 rounded-2xl p-4 border border-white/10">
                <p className="text-slate-400 text-sm">🍽️ Food</p>

                <h3 className="text-xl font-bold mt-2">
                  {itinerary.budget.food}
                </h3>
              </div>

              <div className="bg-slate-900/70 rounded-2xl p-4 border border-white/10">
                <p className="text-slate-400 text-sm">🚇Local Transport</p>

                <h3 className="text-xl font-bold mt-2">
                  {itinerary.budget.transport}
                </h3>
              </div>

              <div className="bg-slate-900/70 rounded-2xl p-4 border border-white/10">
                <p className="text-slate-400 text-sm">🎟️ Tickets</p>

                <h3 className="text-xl font-bold mt-2">
                  {itinerary.budget.tickets}
                </h3>
              </div>

              <div className="bg-slate-900/70 rounded-2xl p-4 border border-white/10">
                <p className="text-slate-400 text-sm">🛍️ Shopping</p>

                <h3 className="text-xl font-bold mt-2">
                  {itinerary.budget.shopping}
                </h3>
              </div>
            </div>

            <div
              className="
    mt-6
    flex
    flex-col
    md:flex-row
    justify-between
    gap-4
    bg-liner-gradient-to-r
    from-sky-500/20
    to-green-500/20
    rounded-2xl
    p-5
    border
    border-sky-400/20
    "
            >
              <div>
                <p className="text-slate-300 text-sm">Estimated Total Cost</p>

                <h3 className="text-3xl font-bold text-green-400">
                  {itinerary.budget.total}
                </h3>
              </div>

              <div>
                <p className="text-slate-300 text-sm">Remaining Budget</p>

                <h3 className="text-3xl font-bold">
                  {itinerary.budget.remaining}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-5">Local Transport</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {itinerary.transport.map((item, index) => (
              <div
                key={index}
                className="
        rounded-3xl
        bg-white/5
        border border-white/10
        backdrop-blur-xl
        p-5
        hover:border-green-400/40
        hover:-translate-y-1
        transition-all
        shadow-lg
        "
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">{item.type}</h3>

                  <span
                    className="
          bg-green-500/20
          text-green-300
          px-3 py-1
          rounded-full
          text-xs
          "
                  >
                    🚗 Travel
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  <div>
                    <p className="text-sm text-slate-400">Approx Fare</p>

                    <p className="text-lg font-semibold text-green-400">
                      {item.fare}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-400">Best For</p>

                    <p className="text-white">{item.bestFor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 mb-10">
          <h2 className="text-2xl font-bold mb-5">Travel Tips</h2>

          <div
            className="
    rounded-3xl
    bg-white/5
    border border-white/10
    backdrop-blur-xl
    p-6
    shadow-lg
    "
          >
            <div className="grid md:grid-cols-2 gap-4">
              {itinerary.tips.map((tip, index) => (
                <div
                  key={index}
                  className="
          flex
          items-center
          gap-4
          bg-slate-900/70
          rounded-2xl
          p-4
          border
          border-white/10
          hover:border-yellow-400/40
          transition-all
          "
                >
                  <div
                    className="
          h-9
          w-9
          rounded-full
          bg-yellow-500/20
          flex
          items-center
          justify-center
          text-yellow-300
          font-bold
          "
                  >
                    ✓
                  </div>

                  <p className="text-slate-200">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
