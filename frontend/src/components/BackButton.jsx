import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="relative z-20 w-full flex justify-end px-4 sm:px-6 md:px-8 mt-2">
  <button
    onClick={() => navigate(-1)}
    className="
      flex items-center gap-1 sm:gap-2
      bg-black/60 hover:bg-sky-950/50
      border border-sky-700/90 hover:border-sky-500
      px-1.5 py-1
      sm:px-2 sm:py-1
      md:px-3 md:py-1.5
      rounded-lg md:rounded-xl
      text-[10px] sm:text-xs md:text-sm
      font-medium text-white
      transition-all duration-300
    "
  >
    <ArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
    Back
  </button>
</div>
  );
};

export default BackButton;