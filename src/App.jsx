import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from './pages/Home';
import DivisionPage from './Pages/DivisionPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/division/:divisionName" element={<DivisionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
