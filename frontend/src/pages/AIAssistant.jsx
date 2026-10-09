import { useState, useRef, useEffect } from "react";
import { chatWithAI } from "../services/aiService";
import Navbar from "../components/Navbar";
import loginPagebg from "../assets/loginpagebg4.avif";
import ReactMarkdown from "react-markdown";
import BackButton from "../components/BackButton";
const AIAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);
  const handleAskAI = async () => {
    if (!message.trim()) return;

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    setMessage("");

    try {
      setLoading(true);

      const response = await chatWithAI(userMessage);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: response,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-dvh w-full flex flex-col overflow-hidden text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${loginPagebg})`,
        }}
      />
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="z-20 shrink-0 w-full">
        <Navbar />
      </div>
      < BackButton/>

      <div className="relative z-10 flex-1 min-h-0 w-full flex justify-center p-2 pb-10">
        <div className="w-full max-w-4xl p-3 sm:p-4 flex flex-col h-full min-h-0 bg-black/70 rounded-3xl border border-sky-900">
          <div className="shrink-0 pt-1 sm:pt-2 text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-blue-50">
              Voyage<span className="text-sky-400">AI</span> Assistant ⚡
            </h1>

            <p className="text-xs text-gray-300 m-2">
              Ask me anything about your next journey.
            </p>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto my-2 pr-1 sm:pr-2">
            <div className="space-y-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-center"
                  }`}
                >
                  <div
                    className={`max-w-[88%] sm:max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                      msg.role === "user"
                        ? "bg-sky-900 text-white"
                        : "bg-black/70 border border-sky-700/60 text-gray-200"
                    }`}
                  >
                    {msg.role === "ai" && (
                      <p className="text-sky-400 text-xs font-bold mb-1">
                        VoyageAI ⚡
                      </p>
                    )}

                    <ReactMarkdown
                      components={{
                        strong: ({ children }) => (
                          <strong className="font-bold text-white">
                            {children}
                          </strong>
                        ),

                        ol: ({ children }) => (
                          <ol className="list-decimal ml-5 space-y-2">
                            {children}
                          </ol>
                        ),

                        ul: ({ children }) => (
                          <ul className="list-disc ml-5 space-y-1">
                            {children}
                          </ul>
                        ),

                        li: ({ children }) => (
                          <li className="text-gray-200">{children}</li>
                        ),

                        p: ({ children }) => <p className="mb-3">{children}</p>,
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="text-sky-400 text-xs">
                  VoyageAI is thinking... ⚡
                </div>
              )}
            </div>
            <div ref={chatEndRef} />
          </div>

          <div className="shrink-0 pb-2 pt-1">
            <div className="flex justify-center overflow-x-auto no-scrollbar gap-2 mb-2 pb-1">
              <button
                onClick={() =>
                  setMessage(
                    "Suggest the best peaceful places to visit in India.",
                  )
                }
                className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-black/50 border border-sky-700 text-white text-xs hover:bg-sky-950/50 transition"
              >
                Peaceful
              </button>

              <button
                onClick={() =>
                  setMessage(
                    "Suggest the best adventure destinations in India.",
                  )
                }
                className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-black/50 border border-sky-700 text-white text-xs hover:bg-sky-950/50 transition"
              >
                Adventure
              </button>

              <button
                onClick={() =>
                  setMessage("Suggest the best beach destinations in India.")
                }
                className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-black/50 border border-sky-700 text-white text-xs hover:bg-sky-950/50 transition"
              >
                Beach
              </button>

              <button
                onClick={() =>
                  setMessage(
                    "Suggest the best Mountain destinations in India.",
                  )
                }
                className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-black/50 border border-sky-700 text-white text-xs hover:bg-sky-950/50 transition"
              >
                Mountain
              </button>

              <button
                onClick={() =>
                  setMessage("Suggest budget-friendly destinations in India.")
                }
                className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-black/50 border border-sky-700 text-white text-xs hover:bg-sky-950/50 transition"
              >
            Budget
              </button>
            </div>

            <div className="flex gap-2 items-center p-2">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleAskAI();
                  }
                }}
                placeholder="Ask something like: Suggest peaceful places..."
                rows={1}
                className="flex-1 bg-gray-950/50 border border-gray-700 rounded-xl p-2.5 outline-none resize-none text-white text-xs backdrop-blur-md focus:border-sky-500"
              />

              <button
                onClick={handleAskAI}
                disabled={loading || !message.trim()}
                className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition font-medium text-xs sm:text-sm whitespace-nowrap cursor-pointer"
              >
                {loading ? "..." : "Ask"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
