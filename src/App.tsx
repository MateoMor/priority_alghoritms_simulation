import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import Cpu_algorithms from "./pages/Cpu_algoritms";
import Memory_algorithms from "./pages/Memory_algoritms";

import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Layout
        title="Algoritmos de Prioridad"
        githubRepo="https://github.com/MateoMor/priority_alghoritms_simulation"
      >
        <Routes>
          <Route
            path="/priority_alghoritms_simulation"
            element={<HomePage />}
          />
          <Route path="/cpu" element={<Cpu_algorithms />} />
          <Route path="/memory" element={<Memory_algorithms />} />
        </Routes>
      </Layout>{" "}
    </BrowserRouter>
  );
}

export default App;
