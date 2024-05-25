// Core
import { useOutletContext } from 'react-router-dom';

// State
import useStoresStore from '#/state/storesStore'

// Components
import ButtonList from '#/components/lists/ButtonList';

// Types
import { Store } from '#/types/Store';
import { AppLayoutContext } from '#/types/routes';

export default function StoresPage() {

    const outletContext = useOutletContext<AppLayoutContext>();

    const stores = useStoresStore();

    return (
        <div className='h-full flex flex-col'>
            <h1>Stores</h1>
            <ButtonList
                items={stores.items}
                render={(item: Store) => item.name}
                onItemClick={(item: Store) => outletContext.onStoreFormDialogOpen(item)}
                keyExtractor={(item: Store) => item.id}
            />
        </div>
    )
}