// Core
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

// Constants
import { NavItem, mainNavigation } from './constants/navigation';

// Components
import { Drawer, DrawerContent, DrawerTrigger } from './components/Drawer';
import { Button } from './components/input/Button';
import { Dialog, DialogHeader, DialogOverlay, DialogContent, DialogClose } from '#/components/Dialog';
import StoreForm, { StoreFormValues } from './components/forms/StoreForm';

// State
import useGroceriesStore from './state/groceriesStore';
import useStoresStore from './state/storesStore';

// Util
import getGroceriesLink from './util/getGroceriesLink';

// Types
import { Store } from './types/Store';

export default function AppLayout() {

    const getGroceries = useGroceriesStore((state) => state.getAll);
    const stores = useStoresStore();

    const location = useLocation();
    const navigate = useNavigate();

    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    const [selectedStore, setSelectedStore] = useState<Store | null>(null);
    const [isStoreFormOpen, setIsStoreFormOpen] = useState<boolean>(false);

    const onNavItemClick = (navItem: NavItem) => {
        navigate(navItem.path);
        setIsDrawerOpen(false);
    }

    const onShareLinkClick = async () => {
        const allGroceries = await getGroceries();
        if(!allGroceries.length) {
            alert('Please add some groceries before sharing a link');
            return;
        }
        const url = await getGroceriesLink(allGroceries);
        navigator.clipboard.writeText(url.href);
        alert(url.href);
    }

    const onStoreFormDialogOpen = (store: Store | null) => {
        setSelectedStore(store);
        setIsStoreFormOpen(true);
    }

    const handleStoreFormSubmit = (formValues: StoreFormValues) => {
        if(!selectedStore) {
            stores.add({
                ...formValues
            });
        } else {
            stores.update({
                id: selectedStore.id,
                ...formValues
            })
        }
        setIsStoreFormOpen(false);
    }

    const handleStoreFormDelete = (store: Store) => {
        stores.delete(store);
        setIsStoreFormOpen(false);
    }

    return (
        <>
            <nav className='p-2 pt-4'>
                <Drawer
                    direction='left'
                    open={isDrawerOpen} 
                    onOpenChange={setIsDrawerOpen}
                >
                    <DrawerTrigger>
                        <Menu
                            className='h-6 w-6'
                        />
                    </DrawerTrigger>
                    <DrawerContent
                        className='flex flex-col rounded-r-[10px] h-full w-[200px] mt-24 fixed bottom-0 left-0'
                    >
                        <ul>
                        {mainNavigation.map(navItem => (
                            <li key={navItem.path}>
                                <Button
                                    variant='ghost'
                                    className={location.pathname == navItem.path ? 'text-primary' : undefined}
                                    onClick={() => onNavItemClick(navItem)}
                                >
                                    {navItem.label}
                                </Button>
                            </li>
                        ))}
                        <li key='share'>
                                <Button
                                    variant='ghost'
                                    className='hover:bg-background'
                                    onClick={() => onShareLinkClick()}
                                >
                                    Share list
                                </Button>
                            </li>
                        </ul>
                    </DrawerContent>
                </Drawer>
            </nav>
            <main className='px-2 flex-grow'>
                <Outlet 
                    context={{
                        onStoreFormDialogOpen
                    }}
                />
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
                            onDelete={handleStoreFormDelete}
                        />
                    </DialogContent>
                </Dialog>
            </main>
        </>
    )
}