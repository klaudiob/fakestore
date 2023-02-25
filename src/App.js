import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductsList from "./components/ProductsList";
import ProductDetail from "./components/ProductDetail";


function App() {
  return (
    <Router>
      <div className='App'>
        <MyNavbar />
        <Routes>
          <Route path="/" element={<ProductsList />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
