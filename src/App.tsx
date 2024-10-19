// Core
import { RouterProvider } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

// Util
import router from './router'
import useGroceriesStore from './state/groceriesStore';
import { useEffect } from 'react';
import getDataFromLink from './util/getDataFromLink';
import useStoresStore from './state/storesStore';

function App() {

  const groceries = useGroceriesStore();
  const stores = useStoresStore();

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
      const sharedData = await getDataFromLink(location.href);
      groceries.upsertMany(sharedData.groceries);
      stores.upsertMany(sharedData.stores);
    }
  }

  useEffect(() => {
    initGroceries();
    stores.init();
  }, [])

  return (
    <>
      <Analytics/>
      <RouterProvider 
        router={router}
      />
    </>
    
  )
}

export default App
