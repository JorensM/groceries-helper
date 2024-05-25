// Core
import { create } from 'zustand';

// Classes
import db from '#/classes/usedDB';

// Types
import { AbstractDataStoreSlice } from './abstractDataStore';
import { Grocery } from '#/types/Grocery';

// State
import createAbstractDataStoreSlice from './abstractDataStore';

type GroceriesStore = AbstractDataStoreSlice<Grocery> & {
    addToBuyItems: (toBuy: { item: Grocery, amount: number }[]) => void
    clearToBuyList: () => void
    clearCalculatorAmounts: () => void
};

const convertGroceriesToNewSchema = (items: Grocery[]) => {
    return items.map((item) => {
        const newItem = item;
        if(typeof newItem.prices !== 'object') {
            newItem.prices = {}
        }

        return newItem;
    })
}

const useGroceriesStore = create<GroceriesStore>((set, get) => ({
    ...createAbstractDataStoreSlice<Grocery>(
        [],
        db.groceries,
        (items: Grocery[]) => {
            set({
                items: convertGroceriesToNewSchema(items)
            })
        },
        set,
        get
    ),
    addToBuyItems: async (toBuy: { item: Grocery, amount: number }[]) => {
        console.log('adding to buy: ', toBuy);
        for(const {item, amount} of toBuy) {
            const oldItem = get().items.find(_item => _item.id == item.id);
            if(!oldItem) {
                throw new Error('Could not find item by ID ' + item.id);
            }
            await get().update({
                id: item.id,
                toBuy: (oldItem.toBuy || 0) + amount
            })
        }
    },
    clearToBuyList: async () => {
        const items = get().items;
        for(const item of items) {
            await get().update({
                id: item.id,
                toBuy: 0,
                checkedInToBuy: false
            })
        }
    },
    clearCalculatorAmounts: async () => {
        const items = get().items;
        for(const item of items) {
            await get().update({
                id: item.id,
                amountInCalculator: 0
            })
        }
    }
}));

export default useGroceriesStore;