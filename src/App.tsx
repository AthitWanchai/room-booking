
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import BookingsPage from './pages/BookingsPage';
import RoomsPage from './pages/RoomsPage';

function App() {
     return (
          <Router>
               <Routes>
                    <Route path="/" element={<Layout />}>
                         <Route index element={<HomePage />} />
                         <Route path="bookings" element={<BookingsPage />} />
                         <Route path="rooms" element={<RoomsPage />} />
                    </Route>
               </Routes>
          </Router>
     );
}

export default App;