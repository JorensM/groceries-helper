// State
import { Button } from '#/components/input/Button';
import useGroceriesStore from '#/state/groceriesStore'

// Types
import { Grocery } from '#/types/Grocery';

export default function CalculatorPage() {

    const groceries = useGroceriesStore();

    const handleGroceriesAmountChange = (grocery: Grocery, newAmount: number) => {
        groceries.update({
            ...grocery,
            amountInCalculator: newAmount || 0
        })
    }

    const calculateGroceriesTotalPrice = (items: Grocery[]): number => {
        return items.reduce((n, {amountInCalculator, price}) => n + (amountInCalculator || 0) * price, 0);
    }

    const totalPrice = calculateGroceriesTotalPrice(groceries.items);

    const handleSaveToBuyButtonClick = async () => {
        await groceries.addToBuyItems(groceries.items.filter(grocery => grocery.amountInCalculator > 0).map(grocery => ({
            item: grocery,
            amount: grocery.amountInCalculator
        })))
        await groceries.clearCalculatorAmounts();
    }

    return (
        <div className='flex flex-col h-full'>
            <div className='flex justify-between items-center'>
                <h1 className='w-fit'>Calculator</h1>
                <span>Total:&nbsp;<b>{totalPrice.toFixed(2)}&euro;</b></span>
            </div>
            {groceries.items.length ?
                <>
                    <ul>
                        {groceries.items.map(grocery => (
                            <li className='flex items-center w-full justify-between'>
                                {grocery.name}
                                &nbsp;
                                -
                                &nbsp;
                                {grocery.price} &euro;
                                <input
                                    className='w-16 bg-transparent border-x-0 border-t-0 border-b-2 text-background overflow-visible'
                                    value={grocery.amountInCalculator}
                                    type='number' 
                                    step='1' 
                                    onChange={(e) => handleGroceriesAmountChange(grocery, parseFloat(e.target.value))}
                                />
                            </li>
                        ))}
                    </ul>
                    {totalPrice !== 0 &&
                        <Button
                            className='mt-4'
                            onClick={handleSaveToBuyButtonClick}
                        >
                            Save to 'to buy'
                        </Button>
                    }
                </>
            : 
                <div className='flex flex-grow items-center justify-center text-center text-neutral-400'>
                    First, add some groceries on the 'All groceries' page
                </div>
            }
        </div>
    )
}