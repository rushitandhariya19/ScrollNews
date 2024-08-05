import React, { useRef, useState } from 'react'

export default function Try() {

    // var abc = 100;
    const abc = useRef(100)
    const mybtn = useRef("")
    const prev = useRef(0)
    function my_val(){

        prev.current=value
        setValue(value+1)
        abc.current=abc.current+10

        mybtn.current.style.backgroundColor="red"
    }
    const [value,setValue] = useState(1)

  return (
    <>
        <button onClick={e=>my_val()} ref={mybtn}>Click</button>
        <h2>{value}</h2>
        <h2>{abc.current}</h2>
        <h2>{prev.current}</h2>
    </>
  )
}
