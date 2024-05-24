import { ID } from './misc'

export type Grocery = {
    id: ID,
    name: string,
    prices: { [storeID: string]: number },
    checkedInCalculator: boolean,
    amountInCalculator: number,
    toBuy: number,
    checkedInToBuy: boolean
}