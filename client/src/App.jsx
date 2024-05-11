import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './Components/Form';
import ShowData from './Components/ShowData';
import Navbar from './Components/Navbar.jsx';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Form />} />
          <Route path='/data' element={<ShowData />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
