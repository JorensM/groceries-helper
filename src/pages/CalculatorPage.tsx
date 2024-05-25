// Components
import { Button } from '#/components/input/Button';
import StoreSelect from '#/components/input/StoreSelect';

// State
import useGroceriesStore from '#/state/groceriesStore'
import useStoresStore from '#/state/storesStore';

// Types
import { Grocery } from '#/types/Grocery';
import { Store } from '#/types/Store';
import { ID } from '#/types/misc';

export default function CalculatorPage() {

    const groceries = useGroceriesStore();
    const stores = useStoresStore();

    // const [selectedStores, setSelectedStores] = useState<{[groceryID: string]: number}>()

    const handleGroceriesAmountChange = (grocery: Grocery, newAmount: number) => {
        groceries.update({
            ...grocery,
            amountInCalculator: newAmount || 0
        })
    }

    const calculateGroceriesTotalPrice = (items: Grocery[]): number => {
        return items.reduce((n, {amountInCalculator, prices, selectedStoreInCalculator}) =>
             n + (amountInCalculator || 0) * (prices?.[selectedStoreInCalculator || ""] || 0), 0
        );
    }

    const getGroceryPrice = (grocery: Grocery): number => {
        return grocery.prices?.[grocery.selectedStoreInCalculator || ""] || 0;
    }

    const totalPrice = calculateGroceriesTotalPrice(groceries.items);

    const handleSaveToBuyButtonClick = async () => {
        await groceries.addToBuyItems(groceries.items
            .filter(grocery => grocery.amountInCalculator > 0 && grocery.selectedStoreInCalculator)
            .map(grocery => ({
                item: grocery,
                amount: grocery.amountInCalculator,
                price: getGroceryPrice(grocery),
                store: grocery.selectedStoreInCalculator!
            }))
        )
        await groceries.clearCalculatorAmounts();
    }

    const getStoresThatHavePricesForGrocery = (grocery: Grocery, stores: Store[]) => {
        console.log(grocery);
        return stores.filter((store) => (store.id in grocery.prices))
    }

    const handleStoreSelect = (grocery: Grocery, storeID: ID) => {
        groceries.update({
            id: grocery.id,
            selectedStoreInCalculator: storeID
        })
    }

    return (
        <div className='flex flex-col h-full'>
            <div className='flex justify-between items-center'>
                <h1 className='w-fit'>Calculator</h1>
                <span>Total:&nbsp;<b>{totalPrice.toFixed(2)}&euro;</b></span>
            </div>
            {groceries.items.length ?
                <>
                    <table className='overflow-y-auto table-auto'>
                        <thead>
                            <tr>
                                <th rowSpan={2}>Item</th>
                                {/* <div> */}
                                    {/* <div> */}
                                        {/* Stores */}
                                    {/* </div> */}
                                    {/* <th>1</th> */}
                                    {/* <th>1</th> */}
                                    {/* <th>1</th> */}
                                {/* </div> */}
                                <th rowSpan={1} colSpan={stores.items.length}>Prices</th>
                                <th rowSpan={1} colSpan={2}>Actions</th>
                            </tr>
                            <tr>
                                    {stores.items.map((store) => (
                                        <th style={{backgroundColor: store.color}}>
                                            <span className='hidden sm:inline'>
                                                {store.name}
                                            </span>
                                        </th>
                                    ))}
                                    <th>Store</th>
                                    <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>

                            {groceries.items.map(grocery => (
                                <tr 
                                    key={grocery.id}
                                >
                                    <div className='py-2'>
                                        <td className='pl-2'>
                                            <span>
                                                {grocery.name}
                                                {/* &nbsp; */}
                                                {/* - */}
                                                {/* &nbsp; */}
                                                {/* {grocery.price} &euro; */}
                                            </span>
                                        </td>
                                    </div>
                                    {stores.items.map(store => {
                                        return (
                                            <td>
                                                <div className='flex items-center justify-center'>
                                                    {grocery.prices[store.id] ? grocery.prices[store.id] + ' €' : '-'}
                                                </div>
                                            </td>
                                        )
                                    })}
                                    <td>
                                        <div className='flex items-center justify-around'>
                                            <StoreSelect
                                                stores={getStoresThatHavePricesForGrocery(grocery, stores.items)}
                                                onChange={(storeID: number) => handleStoreSelect(grocery, storeID)}
                                                value={grocery.selectedStoreInCalculator}
                                            />
                                        </div>
                                        
                                    </td>
                                    <td>
                                        {grocery.selectedStoreInCalculator ? 
                                            <input
                                                className='max-w-16 bg-transparent border-x-0 border-t-0 border-b-2 text-background overflow-visible'
                                                value={grocery.amountInCalculator}
                                                type='number' 
                                                step='1' 
                                                onChange={(e) => handleGroceriesAmountChange(grocery, parseFloat(e.target.value))}
                                            />
                                        : null}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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