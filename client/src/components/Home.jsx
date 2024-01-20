import React from 'react'
import { useState } from 'react'

function Home({user}) {
  return (
    <div>
     <p>Home</p>
     <p>{user}</p>
    </div>
  )
}

export default Home