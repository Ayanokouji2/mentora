import React from "react";
import { home_cards } from "../../constants/data";
import { Link } from "react-router-dom";
import { Card } from "../../components/ui/card";

const Home = () => {
  return (
    <section className="min-h-screen bg-gray-50 py-20 px-10">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Welcome to <span className="text-[#6c63ff]">Mentora</span>
      </h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {home_cards.map((card) => (
          <Card
            key={card.id}
            className="group  bg-white  border border-gray-200  p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
          >
            {/* Icon */}
            <div className="text-[#6c63ff] text-5xl mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
              <img
                src={card.img}
                alt={card.title}
                className="w-44 h-44 object-contain"
              />
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-800 text-center mb-3">
              {card.title}
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-center mb-5">{card.description}</p>

            {/* Link / Button */}
            <Link
              to={card.link}
              className="block text-center bg-[#FBC884]  text-white py-2 rounded-md hover:bg-[#6c63ff]/90  transition-colors duration-300"
            >
              Explore
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Home;
