'use client'

import { ReactTyped } from "react-typed";


export default function Typed() {
  return (
    <>
        <p id="subHead" className="animate__animated animate__bounceInUp">
          <ReactTyped strings={[
              'Make Learning Fun',
              'Challenge Your Vocab',
              'Discover New Words',
          ]}
                      typeSpeed={100}
                      backSpeed={60}
                      loop
          />
      </p>
    </>
  )
}
