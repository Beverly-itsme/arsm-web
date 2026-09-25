import { BrowserRouter, Routes, Route } from "react-router-dom";
import BoasVindas from "./pages/publico/BoasVindas";
import Termos from "./pages/publico/Termos";
import Idade from "./pages/publico/Idade";
import Home from "./pages/publico/Home";
import Historico from "./pages/publico/Historico";
import Educacao from "./pages/publico/Educacao";
import PHQ9 from "./pages/publico/PHQ9";
import GAD7 from "./pages/publico/GAD7";
import Resultado from "./pages/publico/Resultado";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BoasVindas />} />
        <Route path="/termos" element={<Termos />} />
        <Route path="/idade" element={<Idade />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="/educacao" element={<Educacao />} />
        <Route path="/phq9" element={<PHQ9 />} />
        <Route path="/gad7" element={<GAD7 />} />
        <Route path="/resultado" element={<Resultado />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;