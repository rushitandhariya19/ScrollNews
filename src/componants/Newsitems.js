import React, { useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import img from './default-image.jpg';
import PropsTypes from 'prop-types';

export default function Newsitems(props) {
  
  let articles = [{

  }]
  

  const [state,setState] = useState(
    {
        category: props.category,
        articles: articles,
        country: props.country,
        page: 1,
        total:0
      }
  )

    const prevCategorie = useRef("")

  const goNext= async()=>{
    //console.log("next")
    // this.setState({page:this.state.page+1})
    // await this.loadNews(this.state.page+1)
    let url = `https://newsapi.org/v2/top-headlines?apiKey=bac018d99b064d6688fcfa81cd97623c&category=${props.category}&country=${props.country}&pageSize=6&page=${state.page+1}`

    //console.log("next"+url)
    try {
      props.setProgress(60)
      let data = await fetch(url)
    //console.log(data)

    let jsondata = await data.json()
    //console.log(jsondata)
    setState(
      { articles: state.articles.concat(jsondata.articles),
        total: jsondata.totalResults,
        page:state.page+1
      })  
      props.setProgress(100)
    } catch (error) {
      //console.log("error")
    }
    
  }

  useEffect(() => {
    //compare with previous category or country
    // if they are diffrent -> reset query to null
    //console.log(props.query+"<<<<<<-----------")
    if(prevCategorie.current!=props.category){
      // props.setNewsquery(null)
      console.log("searching custom")
    }
    else if(prevCategorie.current==props.category && props.query!=null)
    {
      // props.setNewsquery(null)
      console.log("reset searching custom")
    }
    loadNews()
  }, [props.category,props.country,props.query])
  function cap(v){
    return v.charAt(0).toUpperCase()+""+v.slice(1)
  }
  return (
    <div className='container'>
      <h3>
        {(props.query!=null) ?'Search Result For '+cap(props.query):"Showing New For "+cap(props.category)+(" "+props.countryFull)}
        {/* {`Showing news for ${cap((props.query!=null) ?props.query: props.category)}`} */}
        {/* {cap(props.category)} */}
        {/* {Math.round (state.total/3)} */}
        {/* {state.page} */}
      </h3>
      <h5>
        {"Showing "+state.total+" Articles"}
      </h5>
      <InfiniteScroll
          dataLength={state.articles.length} //This is important field to render the next data
          next={goNext}
          hasMore={Math.round (state.total/6)!=state.page}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }>
      <div className='row'>
        {
          state.total > 0 && state.articles.map((mynews) =>{

            return <div className='col-md-4 mb-5' key={mynews.url}>
              <div className="card">
                <img src={mynews.urlToImage?mynews.urlToImage:img} className="card-img-top img" alt="..." />
                <div className="card-body">
                  <p>Author :&nbsp;{mynews.author}</p>
                  <p>Published at : &nbsp;{new Date (mynews.publishedAt).toDateString()}</p>
                  <h5 className="card-title">{mynews.title.slice(0,70)}...</h5>
                  <p className="card-text">{mynews.description ? mynews.description.slice(0,100):mynews.title.slice(0,100)}...</p>
                  <a href={mynews.url} target='_blank' className="btn btn-primary">Read More</a>
                </div>
              </div>
            </div>
})
        }
      </div>
      </InfiniteScroll>
      {/* <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
        <div class="btn-group me-2" role="group" aria-label="First group">
          <button type="button" class="btn btn-primary" disabled={this.state.page==1} onClick={this.goPrev}>Previous</button>
          <button type="button" class="btn btn-danger" disabled={Math.round (this.state.total/3)==this.state.page} onClick={this.goNext}>Next</button>
        </div>
      </div> */}
    </div>
  )
  async function loadNews(page) {



    // if(prevCategorie.current != state.category){
    document.title=cap((props.query!=null) ?props.query: props.category)
    prevCategorie.current=state.category
    console.log("prvious  "+prevCategorie.current+" new "+props.category)
    props.setProgress(30)
    var url = `https://newsapi.org/v2/top-headlines?apiKey=bac018d99b064d6688fcfa81cd97623c&category=${props.category}&country=${props.country}&pageSize=6&page=${page}`
    //console.log(">>>>>>"+props.query)
    if(props.query!=null)
    {
    url = `https://newsapi.org/v2/everything?apiKey=bac018d99b064d6688fcfa81cd97623c&pageSize=6&page=${page}&q=${props.query}`
    }
    //console.log(url)
    try{
      let data = await fetch(url)
    //console.log(data)

    let jsondata = await data.json()
    //console.log(jsondata)
    setState(
      { articles: jsondata.articles,
        total: jsondata.totalResults,
        category: props.category,
        page:1
      })
      props.setProgress(100)
    }
    catch(error){
      //console.log("error")
    }
  }  
}
Newsitems.propTypes={
  country:PropsTypes.string,
  category:PropsTypes.string
}
Newsitems.defaultProps={
  country:"in",
  category:"general"
}