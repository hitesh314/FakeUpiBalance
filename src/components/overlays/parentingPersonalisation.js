import { useState } from "react";
import { X } from "lucide-react";
import Cookies from "js-cookie";

export default function CurrentStageOverlay({ onClose }) {
  const [selectedStage, setSelectedStage] = useState(null);
  const stages = [
    { id: 1, title: "Baby on the Way", icon: "🚼" },
    { id: 2, title: "Someone I Love is Pregnant", icon: "⭐" },
    { id: 3, title: "Trying to Conceive", icon: "🧪" },
    { id: 4, title: "I Am a Parent", icon: "👨‍👩‍👧" },
  ];

  const handleStageClick = (stage) => {
    setSelectedStage(stage?.id);
    Cookies.set("user_stage", stage?.id, { expires: 30 * 9, path: "/" });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      {/* Modal */}
      <div className="bg-white rounded-xl p-6 shadow-md max-w-lg w-full relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        {/* Header */}
        <h2 className="text-xl font-bold text-gray-800 text-center">
          Get More From <span className="text-blue-600">Aid&Heal</span>
        </h2>
        <p className="text-gray-600 text-center mt-2">
          Sign up for personalized updates to guide you on your journey.
        </p>

        {/* Journey Options */}
        <div className="mt-6 space-y-4">
          {stages.map((stage) => (
            <button
              key={stage.title}
              className={`w-full flex items-center justify-between px-4 py-3 border rounded-lg shadow-sm transition ${
                selectedStage === stage.title
                  ? "bg-blue-100 border-blue-400"
                  : "bg-white hover:bg-gray-50"
              }`}
              onClick={() => handleStageClick(stage)}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{stage.icon}</span>
                <span className="text-gray-800 font-medium">{stage.title}</span>
              </div>
              <span className="text-gray-400">&rarr;</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
