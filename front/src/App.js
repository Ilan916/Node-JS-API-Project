import { Home, Detail, FormAdd, FormEmail }  from './pages'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/formemail">Formulaire Contact</Link>
          </li>
          <li>
            <Link to="/formadd">Ajouter une carte</Link>
          </li>
          <li>
            <Link to="/detail">détail de la carte</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/formadd" element={<FormAdd />} />
        <Route path="/formemail" element={<FormEmail />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
