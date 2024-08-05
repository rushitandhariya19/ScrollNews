import './App.css';
import Navbar from './componants/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import News from './componants/News';
import Search from './componants/Search';
import { useRef, useState } from 'react';
import Try from './componants/Try';


//  for routing comand = npm i -D react-router-dom

function App() {
  const [country, setCountry] = useState("in")
  const [countryFull, setCountryFull] = useState("India")

  const [progress, setProgress] = useState(0)

  const [newsquery, setNewsquery] = useState(null)

  function news_search() {

  }

  return (
    <>

      <BrowserRouter>
        <Navbar country={country} setcnt={setCountry} countryFull={countryFull} setCountryFull={setCountryFull} progress={progress} newsquery={newsquery} setNewsquery={setNewsquery} />
        <Routes> 
          <Route exact path='/' element={<News setProgress={setProgress} category="general" country={country} countryFull={countryFull} query={newsquery} setNewsquery={setNewsquery} />}></Route>

          <Route exact path='business' element={<News setProgress={setProgress} category="business" country={country} countryFull={countryFull} query={newsquery} setNewsquery={setNewsquery} />}></Route>
          
          <Route exact path='sports' element={<News setProgress={setProgress} category="sports" country={country} countryFull={countryFull} query={newsquery} setNewsquery={setNewsquery} />}></Route>
          
          <Route exact path='technology' element={<News setProgress={setProgress} category="technology" country={country} countryFull={countryFull} query={newsquery} setNewsquery={setNewsquery} />}></Route>
          
          <Route exact path='science' element={<News setProgress={setProgress} category="science" country={country} countryFull={countryFull} query={newsquery} setNewsquery={setNewsquery} />}></Route>
          
          <Route exact path='entertainment' element={<News setProgress={setProgress} category="entertainment" country={country} countryFull={countryFull} query={newsquery} setNewsquery={setNewsquery} />}></Route>
          
          <Route exact path='health' element={<News setProgress={setProgress} category="health" country={country} countryFull={countryFull} query={newsquery} setNewsquery={setNewsquery} />}></Route>
          
          <Route exact path='search' element={<Search setProgress={setProgress} />}></Route>
          
          <Route exact path='*' element={<h3>invalid page</h3>}></Route>
          {/* <Route exact path='try' element={<Try/>}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
