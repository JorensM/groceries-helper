import useGroceriesStore from '#/state/groceriesStore';
import useStoresStore from '#/state/storesStore';
import { Grocery } from '#/types/Grocery';
import { Store } from '#/types/Store';

export default function useImport() {
    const _stores = useStoresStore();
    const _groceries = useGroceriesStore();

    return (groceries: Grocery[], stores: Store[]) => {
        _stores.upsertMany(stores);
        _groceries.upsertMany(groceries);
        return true;
    }
}