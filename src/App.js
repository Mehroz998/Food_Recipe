import {createBrowserRouter , RouterProvider} from 'react-router-dom';
import Main from './Components/Main'
import Recipe from './Components/Recipe';
import { useState } from 'react';


function App() {
  const [code , setCode] = useState()
  const getCode3 = (value)=>{
    setCode(value)
  }
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Main getCode3={getCode3}/>
    },
    {
      path:'/recipe',
      element:<Recipe code={code}/>
    }
  ])
  return (
    <>
    <RouterProvider router={router}/>
    </>
  );
}

export default App;
