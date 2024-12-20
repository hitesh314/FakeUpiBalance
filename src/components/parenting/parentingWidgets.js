import Image from "next/image";
import Link from "next/link";

const ToolsWidgets = (props) => {
  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Tools & Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {props?.toolsList?.map((tool) => (
            <div
              key={tool.id}
              className={`flex flex-col items-center text-center p-5 rounded-lg shadow-lg bg-white ${
                tool.isAvailable ? "hover:shadow-xl transition" : "opacity-50"
              }`}
            >
              {/* Tool Icon */}
              <div className="relative w-24 h-24 mb-4">
                <Image
                  src={tool.surveyImage}
                  alt={tool.bannerText}
                  fill
                  className="object-contain"
                />
              </div>
              {/* Tool Title */}
              <h3 className="text-lg font-semibold mb-2">{tool.surveyTitle}</h3>

              {/* Button */}
              {tool.isAvailable ? (
                <Link
                  href={tool.redirectUrl}
                  className="text-primary hover:text-blue-800 font-medium"
                >
                  Try Now
                </Link>
              ) : (
                <span className="text-gray-500 italic">Coming Soon</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsWidgets;
