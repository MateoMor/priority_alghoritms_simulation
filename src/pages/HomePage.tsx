import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-10">
      <h2 className="text-3xl font-semibold text-center">
        Selecciona el simulador que quieres explorar
      </h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          className="px-6 py-3 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          onClick={() => navigate("/cpu")}
        >
          Simulador CPU
        </button>
        <button
          className="px-6 py-3 rounded bg-green-600 text-white hover:bg-green-700 transition-colors"
          onClick={() => navigate("/memory")}
        >
          Simulador Memoria
        </button>
      </div>
    </div>
  );
};

export default HomePage;