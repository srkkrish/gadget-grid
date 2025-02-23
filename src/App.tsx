import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'

import './App.css'
import Header from './components/Header/Header'
import Logout from './components/Logout/Logout';

const ProductHome = React.lazy(() => import('./components/ProductHome/ProductHome'));
const DetailedProduct = React.lazy(() => import('./components/DetailedProduct/DetailedProduct'));

function App() {
  const listifyStyle = ["/logout"].includes(location.pathname)
    ? { margin: "0px" }
    : { margin: "16px 16px 0" };

  const HeaderWrapper = () => {
    const location = useLocation();
    const hideHeaderOnRoutes = ["/logout"];

    if (hideHeaderOnRoutes.includes(location.pathname)) {
      return null;
    }

    return <Header title="GadgetGrid" />;
  }

  return (
    <Router>
      {<HeaderWrapper />}
      <section className='listify' style={listifyStyle}>

        <Suspense fallback={<div style={{ fontSize: '1.25rem' }}>Loading &#x1F503; </div>}>
          <Routes>
            <Route path="/" element={<ProductHome />} />
            <Route path="/product/:category" element={<DetailedProduct />} /> {/* Add route for DetailedProduct */}
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Suspense>
      </section>
    </Router>
  )
}

export default App
