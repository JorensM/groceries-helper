// Types
import { Grocery } from '#/types/Grocery';
import { Store } from '#/types/Store';

export default function makeGroceryPricesList(grocery: Grocery | null, stores: Store[]) {
    const prices: { [storeID: string]: number | null } = {};

    for(const store of stores) {

        prices[store.id.toString()] = grocery?.prices?.[store.id.toString()] || null;
    }

    return prices;
}