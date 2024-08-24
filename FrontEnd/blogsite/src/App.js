import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import About from './About';
import Booking from './Booking';
import Service from './Service';
import Contact from './Contact';
import Testimonial from './Testimonial'
import Technicians from './Technicians';
import Readme from './Readme';
function App() {
  return (
    <div className="App">
      
  
      <Router>
      <Navbar></Navbar>
        <Routes>
        <Route path='/' element={<About/>}></Route>

          <Route path='/about' element={<About/>}></Route>
          <Route path='/booking' element={<Booking/>}></Route>
          <Route path='/service' element={<Service/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/testimonial' element={<Testimonial/>}></Route>
          <Route path='/technicians' element={<Technicians/>}></Route>
          <Route path='/readme' element={<Readme/>}></Route>

        </Routes>
        <Footer></Footer>
      </Router>
      
      

    </div>
  );
}

export default App;
