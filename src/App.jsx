import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import Skills from "./pages/Skills";
import ChoiceSelection from "./pages/ChoiceSelection";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/choiceSelection" element={<ChoiceSelection />} />
      </Routes>
    </Router>
  )
}

export default App
