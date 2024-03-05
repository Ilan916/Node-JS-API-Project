import { Home, Detail, FormAdd, FormEmail }  from './pages'
import { Navbar } from './components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/card/:id" element={<Detail />} />
          <Route path="/formadd" element={<FormAdd />} />
          <Route path="/formemail" element={<FormEmail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
