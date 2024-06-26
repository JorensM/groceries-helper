// Core
import clsx from 'clsx';

// Types
import { Grocery } from '#/types/Grocery';

// Components
import { Checkbox } from '#/components/input/Checkbox';

// State
import useGroceriesStore from '#/state/groceriesStore'
import { Button } from '#/components/input/Button';
import useStoresStore from '#/state/storesStore';

export default function ToBuyPage() {

    const groceries = useGroceriesStore();
    const stores = useStoresStore();

    const groceriesToBuy = groceries.items
        .filter(grocery => grocery.toBuy > 0)
        .sort((a, b) => (a.checkedInToBuy === b.checkedInToBuy) ? 0 : a.checkedInToBuy ? 1 : -1);

        
    const calculateGroceriesTotalPrice = (items: Grocery[]): number => {
        return items.filter(item => item.checkedInToBuy).reduce((n, {toBuy, priceInToBuy}) => n + (toBuy || 0) * (priceInToBuy || 0), 0);
    }
        
    const totalPrice = calculateGroceriesTotalPrice(groceriesToBuy);

    const handleGroceryCheckedChange = (grocery: Grocery, checked: boolean) => {
        groceries.update({
            id: grocery.id,
            checkedInToBuy: checked
        });
    }

    const handleClearListClick = () => {
        groceries.clearToBuyList();
    }


    return (
        <div className='flex flex-col h-full'>
            <div className='flex justify-between items-end mb-2'>
                <h1 className='w-fit'>To Buy</h1>
                <span>Total:&nbsp;<b>{totalPrice.toFixed(2)}&euro;</b></span>
            </div>
            {groceriesToBuy.length > 0 ?
                stores.items.map(store => (
                    <div className='my-1'>
                        <h2 className='text-background'>{store.name}</h2>
                        <ul className='flex-grow overflow-y-auto h-fit pl-2'>
                            {groceriesToBuy.filter(grocery => grocery.storeInToBuy == store.id).map(grocery => (
                                <li 
                                    key={grocery.id}
                                >
                                    <span
                                        className={clsx(
                                            'flex justify-between items-center relative',
                                            grocery.checkedInToBuy && 'strikeout'
                                        )}
                                    >
                                        <span className='flex gap-2 items-center'>
                                            <Checkbox
                                                checked={grocery.checkedInToBuy}
                                                onCheckedChange={(checked: boolean) => handleGroceryCheckedChange(grocery, checked)}
                                            />
                                            <span 
                                                className={
                                                    grocery.checkedInToBuy ? 'line-through' : undefined
                                                }
                                            >
                                                {grocery.name}
                                            </span>
                                        </span>
                                        <span className={clsx('flex items-center', grocery.checkedInToBuy && 'line-through')}>
                                            x
                                            {grocery.toBuy}
                                        </span>

                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
                
            :
                <div className='flex flex-grow items-center justify-center text-center text-neutral-400'>
                    To view this list, please add some groceries in the Calculator page
                </div>
            }
            {groceriesToBuy.length && groceriesToBuy.every(grocery => grocery.checkedInToBuy) ?
                <Button
                    variant='outline'
                    className='mt-auto mb-1'
                    onClick={handleClearListClick}
                >
                    Clear list
                </Button>
            : null}
        </div>
    )
}