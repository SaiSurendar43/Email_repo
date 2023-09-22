import React from 'react'
import Loginform from './Loginform'
import Email from './Email'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

const App = () => {
  return (
    <div> 
        <BrowserRouter>
           <Routes>
             <Route exact path = '/' element ={<Loginform/>}/>
             <Route exact path = '/email' element = {<Email/>}/>
           </Routes>
        </BrowserRouter>

    </div>
  )
}

export default App
