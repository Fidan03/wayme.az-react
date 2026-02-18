import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./layout/header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Skills from "./pages/Skills";
import ChoiceSelection from "./pages/ChoiceSelection";
import Test from "./pages/Test";
import Results from "./pages/Results";
import PDF from "./pages/PDF";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/choiceSelection" element={<ChoiceSelection />} />
        <Route path="/test" element={<Test />} />
        <Route path="/results" element={<Results />} />
        <Route path="/pdf" element={<PDF />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
