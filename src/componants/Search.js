import React from 'react'
import Newsitems from './Newsitems';
import { useLocation } from 'react-router-dom';

export default function Search({ setProgress }) {
    const location = useLocation();
    const query = location.state?.q;
  
    return <Newsitems setProgress={setProgress} query={query} />;
  }