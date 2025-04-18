import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

export default function Navbar({ progress, newsquery, setNewsquery, setcnt, setCountryFull }) {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/search', { state: { q: newsquery } });
  };

  const handleCountryChange = (e) => {
    setcnt(e.target.value);
    const index = e.nativeEvent.target.selectedIndex;
    setCountryFull(e.nativeEvent.target[index].text);
  };

  return (
    <>
      <LoadingBar progress={progress} color='blue' height={3} />
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">ScrollNews</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {[ 'business', 'sports', 'technology', 'science', 'entertainment', 'health'].map((category) => (
                <li className="nav-item" key={category}>
                  <NavLink className="nav-link" to={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</NavLink>
                </li>
              ))}
            </ul>
            <form className="d-flex" onSubmit={handleSearch} role="search">
              <select className="form-control me-2" onChange={handleCountryChange}>
                {/* <option value="in">India</option> */}
                <option value="us">US</option>
                {/* <option value="cn">China</option> */}
              </select>
              <input className="form-control me-2" type="search" placeholder="Search Here" value={newsquery || ''} onChange={(e) => setNewsquery(e.target.value)} />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}