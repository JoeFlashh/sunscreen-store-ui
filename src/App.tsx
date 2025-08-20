import { Routes, Route } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <SearchProvider>
      <div className="site-container">
        <Navbar />
        <main className="site-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </SearchProvider>
  );
}

export default App;
