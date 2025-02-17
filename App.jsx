import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Login from './pages/Login';
function App() {
  return (
    <Router>
     
        {/* Routes to render different pages */}
        <Routes>
          <Route path="/" element={<Login />} />
       
        </Routes>
    </Router>
  );
}

export default App;
