import { Grocery } from '#/types/Grocery';

export default function getStoreIDWithLowestPrice(grocery: Grocery) {
    return parseInt(Object.entries(grocery.prices).reduce(([prevKey, prevValue], [currKey, currValue]) => {
        if(currValue && prevValue && (currValue || 0) < (prevValue || 0)){
            return [currKey, currValue]
        } else {
            return [prevKey, prevValue]
        }
    })[0])
}