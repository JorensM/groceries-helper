import { ID } from './misc'

export type Grocery = {
    id: ID,
    name: string,
    prices: { [storeID: string]: number | null | undefined },
    checkedInCalculator: boolean,
    selectedStoreInCalculator?: ID,
    amountInCalculator: number,
    priceInToBuy?: number,
    toBuy: number,
    storeInToBuy?: number,
    checkedInToBuy: boolean
}