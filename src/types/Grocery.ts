import { ID } from './misc'

export type Grocery = {
    id: ID,
    name: string,
    price: number,
    checkedInCalculator: boolean,
    amountInCalculator: number,
    toBuy: number,
    checkedInToBuy: boolean
}