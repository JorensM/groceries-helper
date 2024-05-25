// Core
import { create } from 'zustand';

// Classes
import db from '#/classes/usedDB';

// Types
import { AbstractDataStoreSlice } from './abstractDataStore';

// State
import createAbstractDataStoreSlice from './abstractDataStore';
import { Store } from '#/types/Store';

type StoresStore = AbstractDataStoreSlice<Store>
const useStoresStore = create<StoresStore>((set, get) => ({
    ...createAbstractDataStoreSlice<Store>(
        [],
        db.stores,
        undefined,
        set,
        get
    ),
}));

export default useStoresStore;