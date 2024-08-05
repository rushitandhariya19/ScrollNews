import React, { Component, useState } from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'

// export default class Navbar extends Component {
export default function Navbar(props){

  const [newsquery,setNewsquery]=useState(props.newsquery)

  function SearchForm ({newsquery,setNewsquery}){

    const navigate = useNavigate();

    function searchf(e) {
      e.preventDefault();
      // console.log("searching");
      navigate("search",{state:{q:newsquery}})
    }
    return(
      <button className="btn btn-outline-success d-none" type="submit" 
      onClick={e=>searchf(e)} onSubmit={e=>searchf(e)}>Search</button>
    )
  }
  // constructor(props) {
  //   super(props)
  //   this.state = { newsquery: props.newsquery }
  //   this.setState({ newsquery: "AAA" })
  // }
  //  searchf() {
  //   props.setNewsquery(props.newsquery)
  //   console.log("helo")
  // }

  function searchf() {
    // props.setNewsquery(newsquery);
    // route this to new component

    console.log("changing query")
  }
  function setnewscountry(e){
    props.setcnt(e.target.value)
    const index=e.nativeEvent.target.selectedIndex
    props.setCountryFull(e.nativeEvent.target[index].text)
  }

    return (
      <>
        <LoadingBar progress={props.progress} color='blue' height={3} />
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">My News</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="/">General</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="business">Business</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="sports">Sports</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="technology">Technology</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="science">Science</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="entertainment">Entertainment</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="health">Health</NavLink>
                </li>
                {/* <li className="nav-item">
          <NavLink className="nav-link" to="try">Try new componant</NavLink>
        </li> */}
              </ul>
              {/* <form className="d-flex" method='get' action='search' role="search">
                <select className="form-control me-2" onChange={e => props.setcnt(e.target.value)}>
                  <option value="in">India</option>
                  <option value="us">US</option>
                  <option value="cn">China</option>
                </select>
                <input name='srch' className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={newsquery} onChange={e => this.setState({ newsquery: e.target.value })} />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form> */}
              <form className="d-flex" role="search">
                <select className="form-control me-2" onChange={e => setnewscountry(e)}>
                  <option value="in">India</option>
                  <option value="us">US</option>
                  <option value="cn">China</option>
                </select>
                <input name='srch' className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={newsquery} onChange={e => setNewsquery(e.target.value)} />
                <SearchForm newsquery={newsquery} setNewsquery={setNewsquery}></SearchForm>
                {/* <button className="btn btn-outline-success" type="button" onClick={e=>searchf()}>Search</button> */}
              </form>
            </div>
          </div>
        </nav>
      </>
    )
}
