import React, { useState } from "react";
import loginPagebg from "../assets/loginpagebg4.avif";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { createTrip } from "../services/tripService";
import toast from "react-hot-toast";

const CreateTrip = () => {
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    startDate: "",
    endDate: "",
    travelers: 1,
    travelMode: "Flight",
    budget: "",
  });

  const [loading, setLoading] = useState(false);
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      toast.error("End date cannot be before Start date");
      return;
    }

    try {
      setLoading(true);
      const data = await createTrip(formData, token);
      toast.success(data.message);
      navigate("/trips");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-black/45 flex flex-col justify-between items-center py-15 pb-32 px-4"
      style={{
        backgroundImage: `url(${loginPagebg})`,
      }}
    >
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 w-full max-w-2xl my-auto">
        <div className="text-center mb-6 text-blue-100">
          <h1 className="[text-shadow:_0_0_8px_rgba(0,0,0,0.9),_0_2px_4px_rgba(0,0,0,0.9),_0_0_2px_rgba(0,0,0,1)] text-4xl md:text-4xl font-extrabold tracking-wide mb-2 drop-shadow-lg">
            Plan Your Trip
          </h1>
          <p className="[text-shadow:_0_0_8px_rgba(0,0,0,0.9),_0_2px_4px_rgba(0,0,0,0.9),_0_0_2px_rgba(0,0,0,1)] text-base md:text-lg opacity-90 drop-shadow">
            Tell us about your trip and let AI build a personalized itinerary
            just for you.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-black/65 backdrop-blur-xl shadow-2xl rounded-2xl border border-sky-400/40 p-6 md:p-8 text-white hover:scale-101 transition-all duration-300 "
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label text-sm font-medium py-1 text-white/90">
                Source City
              </label>
              <input
                type="text"
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="input input-bordered w-full bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-primary"
                placeholder="Delhi"
                required
              />
            </div>

            <div>
              <label className="label text-sm font-medium py-1 text-white/90">
                Destination
              </label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                className="input input-bordered w-full bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-primary"
                placeholder="Goa"
                required
              />
            </div>

            <div>
              <label className="label text-sm font-medium py-1 text-white/90">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="input input-bordered w-full bg-white/10 border-white/20 text-white focus:border-primary [color-scheme:dark]"
                required
              />
            </div>

            <div>
              <label className="label text-sm font-medium py-1 text-white/90">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="input input-bordered w-full bg-white/10 border-white/20 text-white focus:border-primary [color-scheme:dark]"
                required
              />
            </div>

            <div>
              <label className="label text-sm font-medium py-1 text-white/90">
                Travelers
              </label>
              <input
                type="number"
                min="1"
                name="travelers"
                value={formData.travelers}
                onChange={handleChange}
                className="input input-bordered w-full bg-white/10 border-white/20 text-white focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="label text-sm font-medium py-1 text-white/90">
              Travel Mode
              </label>
              <select
                name="travelMode"
                value={formData.travelMode}
                onChange={handleChange}
                className="select select-bordered w-full bg-white/30 border-white/20 text-white focus:border-primary [&>option]:text-black"
              >
                <option value="Flight">✈️ Flight</option>
                <option value="Train">🚆 Train</option>
                <option value="Bus">🚌 Bus</option>
                <option value="Car">🚗 Car</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="label text-sm font-medium py-1 text-white/90">
              Total Budget
            </label>
            <div className="input input-bordered flex items-center gap-2 bg-white/10 border-white/20 text-white focus-within:border-primary">
              <span className="font-bold text-white/70 ">₹</span>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="grow  bg-transparent outline-none placeholder-white/50"
                placeholder="30000"
                min="0"
                
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn bg-sky-500 hover:bg-sky-600 backdrop-blur-md border  border-sky-400/50 hover:border-sky-600/80 py-2 px-3 rounded-xl text-white transition-all duration-300 mt-6 w-full text-base font-semibold shadow-lg"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm "></span>
                Generating Your AI Trip...
              </>
            ) : (
              "Generate Travel Plan"
            )}
          </button>

          <button
            onClick={() => {
              navigate("/dashboard");
            }}
            className="bg-black/65 hover:bg-gray-900 backdrop-blur-md border  border-sky-400/50 hover:border-sky-600/80 py-2 px-3 rounded-xl text-white transition-all duration-300 mt-6 w-full text-base font-semibold shadow-lg"
          >
            ←Back
          </button>
        </form>
      </div>

      <div className="relative z-10 text-center text-white/90 text-xs md:text-sm p-4 max-w-md drop-shadow">
        Personalized Itineraries • Smart Budget Planning
      </div>
    </div>
  );
};

export default CreateTrip;
