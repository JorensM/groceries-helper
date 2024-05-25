// Types
import { Grocery } from '#/types/Grocery';
import { Store } from '#/types/Store';

export default function makeGroceryPricesList(grocery: Grocery | null, stores: Store[], useNull = true) {
    const prices: Record<string, number | null | undefined> = {};

    for(const store of stores) {

        prices[store.id.toString()] = grocery?.prices?.[store.id.toString()] || (useNull ? null : undefined);
    }

    return prices;
}