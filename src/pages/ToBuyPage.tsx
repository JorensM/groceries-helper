// Core
import clsx from 'clsx';

// Types
import { Grocery } from '#/types/Grocery';

// Components
import { Checkbox } from '#/components/input/Checkbox';

// State
import useGroceriesStore from '#/state/groceriesStore'
import { Button } from '#/components/input/Button';

export default function ToBuyPage() {

    const groceries = useGroceriesStore();

    const groceriesToBuy = groceries.items
        .filter(grocery => grocery.toBuy > 0)
        .sort((a, b) => (a.checkedInToBuy === b.checkedInToBuy) ? 0 : a.checkedInToBuy ? 1 : -1);

        
    const calculateGroceriesTotalPrice = (items: Grocery[]): number => {
        return items.filter(item => item.checkedInToBuy).reduce((n, {toBuy, price}) => n + (toBuy || 0) * price, 0).toFixed(2);
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
            <div className='flex justify-between items-center mb-2'>
                <h1 className='w-fit'>To Buy</h1>
                <span>Total:&nbsp;<b>{totalPrice}&euro;</b></span>
            </div>
            {groceriesToBuy.length > 0 ?
                <ul>
                    {groceriesToBuy.map(grocery => (
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
            :
                <div className='flex flex-grow items-center justify-center text-center text-neutral-400'>
                    To view this list, please add some groceries in the Calculator page
                </div>
            }
            {groceriesToBuy.every(grocery => grocery.checkedInToBuy) &&
                <Button
                    variant='outline'
                    className='mt-auto mb-1'
                    onClick={handleClearListClick}
                >
                    Clear list
                </Button>
            }
        </div>
    )
}