import React from 'react'
import Newsitems from './Newsitems';
import { useLocation } from 'react-router-dom';

export default function Search(props,state) {

    // const queryobject = new URLSearchParams(window.location.search);
    // const q = queryobject.get("srch")
    // console.log(state)
    // console.log(props)
    const location = useLocation()
    console.log("location : "+location.state.q)
    const myquery = location.state.q;
    return (
        <>
            <Newsitems setProgress={props.setProgress} query={myquery} />
        </>
    )
}