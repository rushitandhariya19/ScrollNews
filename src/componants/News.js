import React from 'react'
import Newsitems from './Newsitems'

// export default function News(props) {
    const News = (props)=>{
    let {category,country,setProgress,query,setNewsquery,countryFull} = props;

    
    //de-structring of object
  return (
    <>
        <Newsitems setProgress={setProgress} category={category} country={country} countryFull={countryFull} query={query} setNewsquery={setNewsquery}/>
    </>
  )
}
export default News;