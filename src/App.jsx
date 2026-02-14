import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import Skills from "./pages/Skills";
import ChoiceSelection from "./pages/ChoiceSelection";
import Test from "./pages/Test";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/choiceSelection" element={<ChoiceSelection />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  )
}

export default App
