import { Link } from "react-router-dom";
import loginPagebg from "../assets/loginpagebg4.avif";

import { loginUser } from "../services/authService";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const login = useAuthStore((state) => state.login);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email.trim() === "") {
      toast.error("Please enter your email.");
      return;
    }
    if (formData.password.trim() === "") {
      toast.error("Please enter your password.");
      return;
    }
    try {
      setLoading(true);

      const data = await loginUser(formData);

      login(data.user, data.token);

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="inset-0 bg-black/45 min-h-screen bg-cover bg-center absolute flex flex-col justify-between items-center p-6"
      style={{
        backgroundImage: `url(${loginPagebg})`,
      }}
    >
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 text-center text-white mt-8 max-w-xl">
        <h1 className="text-5xl font-extrabold text-white [text-shadow:_0_0_10px_rgba(0,0,0,0.9),_0_2px_4px_rgba(0,0,0,0.9),_0_0_2px_rgba(0,0,0,1)] cursor-pointer p-6">
          Voyage<span className="text-sky-400">AI</span>
        </h1>

        <p className="text-[17px] opacity-90 font-bold text-white [text-shadow:_0_0_10px_rgba(0,0,0,0.9),_0_2px_4px_rgba(0,0,0,0.9),_0_0_2px_rgba(0,0,0,1)] cursor-pointer p-6">
          Your AI-powered companion for personalized travel planning.
        </p>
      </div>

      <div className="relative z-10 w-full max-w-md my-auto transition-all duration-200 ease-in-out">
        <fieldset className="fieldset bg-black/65 backdrop-blur-xl shadow-2xl rounded-2xl border border-sky-400/50 p-8 text-white">
          <legend className="text-xl font-bold mb-2 text-center opacity-90 w-full">
            Ready for your next adventure?
          </legend>

          <p className="text-sm opacity-90 mb-6 text-center">
            Login to continue your next adventure.
          </p>

          <form onSubmit={handleSubmit}>
            <label className="label text-sm font-medium py-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered bg-gray-850 w-full mb-3"
              placeholder="Enter your email"
            />

            <label className="label text-sm font-medium py-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input bg-gray-850 input-bordered w-full"
              placeholder="Enter your password"
            />

            <button
              className="btn bg-sky-500 hover:bg-sky-600 border-2 mt-6 w-full text-base"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>
          <div className="divider my-4">OR</div>

          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-sky-400  font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </fieldset>
      </div>

      <div className="relative z-10 text-center text-white/90 text-xs md:text-sm pb-4 max-w-md drop-shadow">
        Powered by AI • Personalized Itineraries • Smart Budget Planning
      </div>
    </div>
  );
};

export default Login;
