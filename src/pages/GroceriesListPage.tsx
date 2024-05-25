// Core
import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import { PlusIcon, X } from 'lucide-react';
import { DialogClose } from '@radix-ui/react-dialog';

// Components
import { Dialog, DialogHeader } from '#/components/Dialog';
import { DialogContent, DialogTrigger } from '#/components/Dialog';
import GroceryForm, { GroceryFormValues } from '#/components/forms/GroceryForm';

// State
import useGroceriesStore from '#/state/groceriesStore'
import useStoresStore from '#/state/storesStore';

// Util
import handleKeyPress from '#/util/handleKeyPress';

// Types
import { AppLayoutContext } from '#/types/routes';
import { Grocery } from '#/types/Grocery';
import getStoreIDWithLowestPrice from '#/util/getStoreIDWithLowestPrice';
import clsx from 'clsx';

export default function GroceriesListPage() {

    const groceries = useGroceriesStore();
    const stores = useStoresStore();

    const [selectedGrocery, setSelectedGrocery] = useState<Grocery | null>(null);
    const [isGroceryFormOpen, setIsGroceryFormOpen] = useState<boolean>(false);

    const outletContext = useOutletContext<AppLayoutContext>();

    const onGroceryFormSubmit = (formValues: GroceryFormValues) => {

        // const 

        if(!selectedGrocery) {
            groceries.add({
                ...formValues,
                prices: formValues.prices,
                checkedInCalculator: false,
                amountInCalculator: 0,
                toBuy: 0,
                checkedInToBuy: false,
            });
        } else {
            groceries.update({
                id: selectedGrocery.id,
                ...formValues
            })
        }
        setIsGroceryFormOpen(false);
        setSelectedGrocery(null);
    }

    const handleGroceryDelete = (grocery: Grocery) => {
        groceries.delete(grocery.id)
    }

    const handleGrocerySelect = (grocery: Grocery) => {
        setSelectedGrocery(grocery);
        setIsGroceryFormOpen(true);
    }

    

    return (
        <div className='flex flex-col h-full'>
            <div className='flex justify-between'>
                <h1 className='w-fit'>All groceries</h1>
                <Dialog
                    open={isGroceryFormOpen}
                    onOpenChange={setIsGroceryFormOpen}
                >
                    <DialogTrigger>
                        <PlusIcon className='h-6 w-6' 
                            onClick={() => setSelectedGrocery(null)}
                        />
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogClose
                                className='h-fit w-fit ml-auto'
                            >
                                <X className='h-6 w-6 text-foreground' />
                            </DialogClose>
                        </DialogHeader>
                        <GroceryForm
                            grocery={selectedGrocery}
                            stores={stores.items}
                            onSubmit={onGroceryFormSubmit}
                            onDelete={handleGroceryDelete}
                            onAddStoreClick={() => outletContext.onStoreFormDialogOpen(null)}
                        />
                    </DialogContent>
                </Dialog>
                
            </div>
            {groceries.items.length ? 
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
                        </tr>
                        <tr className='h-6'>
                                {stores.items.map((store) => (
                                    <th style={{backgroundColor: store.color}}>
                                        <span className='hidden sm:inline'>
                                            {store.name}
                                        </span>
                                    </th>
                                ))}
                        </tr>
                    </thead>
                    <tbody>

                        {groceries.items.map(grocery => (
                            <tr 
                                key={grocery.id}
                                className='cursor-pointer hover:bg-neutral-700'
                                onClick={() => handleGrocerySelect(grocery)}
                                onKeyUp={(e) => handleKeyPress(e, ['Enter'], () => handleGrocerySelect(grocery))}
                                tabIndex={0}
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
                                            <div 
                                                className={clsx(
                                                    'flex items-center justify-center',
                                                    getStoreIDWithLowestPrice(grocery) == store.id ? 'text-green-400 underline underline-offset-2' : null
                                                )}
                                            >
                                                {grocery.prices[store.id] ? grocery.prices[store.id] + ' €' : '-'}
                                            </div>
                                        </td>
                                    )
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
                // <ul className='flex flex-col flex-grow gap-2 overflow-y-auto h-1'>
                //     {groceries.items.map(grocery => (
                //         <li key={grocery.id}>
                //             <Button 
                //                 variant='ghost'
                //                 onClick={() => handleGrocerySelect(grocery)}
                //                 className='w-full flex justify-between'
                //             >
                //                 <span>
                //                     {grocery.name}
                //                 </span>
                //                 <span>
                //                     {grocery.price} &euro;
                //                 </span>
                //             </Button>
                //         </li>
                //     ))}
                // </ul>
            :
                <div className='flex flex-grow items-center justify-center text-center text-neutral-400'>
                    Add your first grocery by clicking/tapping on the plus icon
                </div>
            }
        </div>
    )
}