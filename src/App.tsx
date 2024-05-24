// Core
import { RouterProvider } from 'react-router-dom';

// Util
import router from './router'
import useGroceriesStore from './state/groceriesStore';
import { useEffect } from 'react';

function App() {

  const groceries = useGroceriesStore();

  useEffect(() => {
    groceries.init();
  }, [])

  return (
    <RouterProvider 
      router={router}
    />
  )
}

export default App
