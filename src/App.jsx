import { Link, Route, Routes } from 'react-router-dom';
import ProductListing from './pages/ProductListing.jsx';
import ProductDetail from './pages/ProductDetail.jsx';

const App = () => {
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/" className="brand-logo" aria-label="ShopLite home">
          <span className="logo-mark">S</span> ShopLite
        </Link>
      </header>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="*" element={<div className="message-panel"><h2>Page not found</h2><Link to="/" className="text-link">Back to products</Link></div>} />
        </Routes>
      </main>
      <footer className="footer">ShopLite · Frontend Engineer Assessment</footer>
    </div>
  );
};

export default App;
