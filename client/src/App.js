// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Collections from './components/Collections';
import ContactCTA from './components/Contact';
import About from './page/About'; 
import Footer from './components/Footer';
import Catalog from './page/Catalog'; 
import Services from './page/Services'; 
import Product from './page/Product';
import Contacts from './page/Contacts';
import Privacy from './page/Privacy';
import NotFound from './page/NotFound';
import Terms from './page/Terms';
import Brand from './page/Brand';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Benefits />
                <Collections />
                <ContactCTA />
              </>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/services" element={<Services />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/brand/:id" element={<Brand />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;