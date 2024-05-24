// Core
import { useState } from 'react';
import { PlusIcon, X } from 'lucide-react';

// Components
import { Dialog, DialogHeader, DialogOverlay } from '#/components/Dialog';
import { DialogContent, DialogTrigger } from '#/components/Dialog';
import GroceryForm, { GroceryFormValues } from '#/components/forms/GroceryForm';
import { Button } from '#/components/input/Button';

// State
import useGroceriesStore from '#/state/groceriesStore'
import { Grocery } from '#/types/Grocery';
import { DialogClose } from '@radix-ui/react-dialog';
import StoreForm, { StoreFormValues } from '#/components/forms/StoreForm';
import useStoresStore from '#/state/storesStore';
import { Store } from '#/types/Store';

export default function GroceriesListPage() {

    const groceries = useGroceriesStore();
    const stores = useStoresStore();

    const [selectedGrocery, setSelectedGrocery] = useState<Grocery | null>(null);
    const [isGroceryFormOpen, setIsGroceryFormOpen] = useState<boolean>(false);
    const [selectedStore, setSelectedStore] = useState<Store | null>(null);
    const [isStoreFormOpen, setIsStoreFormOpen] = useState<boolean>(false);

    const onGroceryFormSubmit = (formValues: GroceryFormValues) => {

        // const 

        if(!selectedGrocery) {
            groceries.add({
                ...formValues,
                prices: formValues.prices,
                checkedInCalculator: false,
                amountInCalculator: 0,
                toBuy: 0,
                checkedInToBuy: false
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

    const handleStoreFormSubmit = (formValues: StoreFormValues) => {
        stores.add({
            ...formValues
        });
        setIsStoreFormOpen(false);
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
                            onAddStoreClick={() => setIsStoreFormOpen(true)}
                        />
                    </DialogContent>
                </Dialog>
                {/* Store form dialog */}
                <Dialog
                    open={isStoreFormOpen}
                    onOpenChange={setIsStoreFormOpen}
                >
                    <DialogContent>
                        <DialogOverlay className='hidden' />
                        <DialogHeader>
                            <DialogClose
                                className='h-fit w-fit ml-auto'
                            >
                                <X className='h-6 w-6 text-foreground' />
                            </DialogClose>
                        </DialogHeader>
                        <StoreForm
                            store={selectedStore}
                            onSubmit={handleStoreFormSubmit}
                        />
                    </DialogContent>
                </Dialog>
            </div>
            {groceries.items.length ? 
                <ul className='flex flex-col flex-grow gap-2 overflow-y-auto h-1'>
                    {groceries.items.map(grocery => (
                        <li key={grocery.id}>
                            <Button 
                                variant='ghost'
                                onClick={() => handleGrocerySelect(grocery)}
                                className='w-full flex justify-between'
                            >
                                <span>
                                    {grocery.name}
                                </span>
                                <span>
                                    {grocery.price} &euro;
                                </span>
                            </Button>
                        </li>
                    ))}
                </ul>
            :
                <div className='flex flex-grow items-center justify-center text-center text-neutral-400'>
                    Add your first grocery by clicking/tapping on the plus icon
                </div>
            }
        </div>
    )
}