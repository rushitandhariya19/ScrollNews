import React from 'react'
import Newsitems from './Newsitems'

function News({ category, country, setProgress, query, setNewsquery, countryFull }) {
  return (
    <Newsitems 
    setProgress={setProgress} 
    category={category} 
    country={country} 
    countryFull={countryFull} 
    query={query} 
    setNewsquery={setNewsquery} />
  );
}

export default News;