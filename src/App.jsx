import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./layout/header";
import {Home, PDF, Skills, Test, About, Results, ChoiceSelection, Login} from './pages/index'

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
