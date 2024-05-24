// Core
import { RouterProvider } from 'react-router-dom';

// Util
import router from './router'
import useGroceriesStore from './state/groceriesStore';
import { useEffect } from 'react';
import getGroceriesFromLink from './util/getGroceriesFromLink';

function App() {

  const groceries = useGroceriesStore();

  const isURLShareable = (url: URL | string): boolean => {
    const _url = new URL(url);

    const sharedFormat = _url.searchParams.get('shared-format') || "";
    const sharedCode = _url.searchParams.get('shared-code');

    return !!(['jsonblob'].includes(sharedFormat) && sharedCode);
  }

  const initGroceries = async () => {
    await groceries.init();
    if(isURLShareable(location.href)) {
      console.log('url is shareable')
      const sharedGroceries = await getGroceriesFromLink(location.href);
      groceries.setAll(sharedGroceries);
    }
  }

  useEffect(() => {
    initGroceries();
  }, [])

  return (
    <RouterProvider 
      router={router}
    />
  )
}

export default App
