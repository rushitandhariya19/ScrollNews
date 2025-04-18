import './App.css';
import Navbar from './componants/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import News from './componants/News';
import Search from './componants/Search';
import { useState } from 'react';

//  for routing command = npm i -D react-router-dom

function App() {
  const [country, setCountry] = useState("");
  const [countryFull, setCountryFull] = useState("US");
  const [progress, setProgress] = useState();
  const [newsquery, setNewsquery] = useState(null);

  return (
    <BrowserRouter>
      <Navbar 
        country={country} 
        setcnt={setCountry} 
        countryFull={countryFull} 
        setCountryFull={setCountryFull} 
        progress={progress} 
        newsquery={newsquery} 
        setNewsquery={setNewsquery} 
      />
      <Routes>
        {['/', 'business', 'sports', 'technology', 'science', 'entertainment', 'health'].map((path, index) => (
          <Route
            key={index}
            path={path === '/' ? '/' : `/${path}`}
            element={
              <News 
                setProgress={setProgress} 
                category={path === '/' ? 'general' : path} 
                country={country} 
                countryFull={countryFull} 
                query={newsquery} 
                setNewsquery={setNewsquery} 
              />
            }
          />
        ))}
        <Route path='/search' element={<Search setProgress={setProgress} />} />
        <Route path='*' element={<h3>Invalid Page</h3>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;