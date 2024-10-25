// Core
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Outlet, useLocation, useMatches, useNavigate } from 'react-router-dom';

// Constants
import { NavItem, mainNavigation, mainSecondaryNavigation } from './constants/navigation';

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
import clsx from 'clsx';
import exportData from './util/exportData';
import importData from './util/importData';
import useImport from './pages/useImport';

export default function AppLayout() {

    //-- State --//
    const getGroceries = useGroceriesStore((state) => state.getAll);
    const stores = useStoresStore();

    //-- Hooks --//
    const location = useLocation();
    const navigate = useNavigate();
    const _importData = useImport();
    
    const currentRoute = useMatches().find(match => match.pathname == location.pathname)!;
    //const searchableMatches = matches.filter(match => (match.handle as any).searchable);

    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [isShareDialogOpen, setIsShareDialogOpen] = useState<boolean>(false);

    const [importInputValue, setImportInputValue] = useState<string>('');

    const [selectedStore, setSelectedStore] = useState<Store | null>(null);
    const [isStoreFormOpen, setIsStoreFormOpen] = useState<boolean>(false);

    const [searchValues, setSearchValues] = useState<{ [routePath: string]: string | undefined}>({});

    const showSearch = (currentRoute.handle as { searchable: boolean } || {})?.searchable;
    const currentPageSearchValue = showSearch ? searchValues?.[currentRoute.pathname] || "" : undefined

    

    const setSearchValue = (routePath: string, value: string | undefined) => {
        setSearchValues((oldState) => {
            const newState = {...oldState};
            newState[routePath] = value;
            return newState;
        })
    }

    const setCurrentMatchSearchValue = (value: string | undefined) => {
        setSearchValue(currentRoute?.pathname, value);
    }

    const onNavItemClick = (navItem: NavItem) => {
        if(navItem.path) {
            navigate(navItem.path);
        } else if(navItem.href) {
            window.open(navItem.href, '_blank');
        } else {
            throw new Error('No link specified for navigation item');
        }
        setIsDrawerOpen(false);
    }

    //-- Share dialog --//

    const onShareLinkClick = async () => {
        const allGroceries = await getGroceries();
        if(!allGroceries.length) {
            alert('Please add some groceries before sharing a link');
            return;
        }
        if(!confirm(
            'Notice: your list data will be stored in a publicly available storage.' +
            'It would still be mostly inaccessible since one would need to know the unique code associated ' +
            'with your list. Do you wish to proceed?')) return;

        const url = await getGroceriesLink(allGroceries, stores.items);
        navigator.clipboard.writeText(url.href);
        alert('Link to your list copied to clipboard!');
    }

    const onExportClick = async () => {
        const groceryItems = await getGroceries();
        exportData(groceryItems, stores.items);
    }

    const onImport = async (file?: File) => {
        if(!file) throw new Error('No file specified')
        try {
            const data = await importData(file);
            const success = _importData(data.groceries, data.stores);
            if(success) alert('Data has been imported')
        } catch (e: any) {
            alert('An error occured: ' + e.message)
        }
        setImportInputValue('');
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

    //-- Layout context --//
    const onStoreFormDialogOpen = (store: Store | null) => {
        setSelectedStore(store);
        setIsStoreFormOpen(true);
    }

    const onSearch = (value: string | undefined) => {
        setCurrentMatchSearchValue(value);
    }

    return (
        <>
            <nav className='flex items-center p-2 pt-4'>
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
                                        type='button'
                                        variant='ghost'
                                        className={clsx('w-full !justify-start', location.pathname == navItem.path ? 'text-primary' : undefined)}
                                        onClick={() => onNavItemClick(navItem)}
                                    >
                                        {navItem.label}
                                    </Button>
                                </li>
                            ))}
                            <li key='share'>
                                <Button
                                    variant='ghost'
                                    className='hover:bg-background hover:text-foreground w-full !justify-start'
                                    onClick={() => setIsShareDialogOpen(true)}
                                >
                                    Share list
                                </Button>
                            </li>
                        </ul>
                        {/* Bottom navigation */}
                        <ul className='mt-auto'>
                            {mainSecondaryNavigation.map(navItem => (
                                <li key={navItem.path}>
                                    <Button
                                        type='button'
                                        variant='ghost'
                                        className={clsx('w-full !justify-start', location.pathname == navItem.path ? 'text-primary' : undefined)}
                                        onClick={() => onNavItemClick(navItem)}
                                    >
                                        {navItem.label}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </DrawerContent>
                </Drawer>
                {showSearch ? 
                    <div className='flex flex-grow ml-4'>
                        <input
                            value={currentPageSearchValue}
                            className='bg-transparent border-gray-500 caret-white w-full rounded-full pl-4 text-white'
                            placeholder='Search'
                            onChange={(e) => onSearch(e.target.value)}
                        />
                    </div>
                    
                : null}
                <Dialog
                    open={isShareDialogOpen}
                    onOpenChange={setIsShareDialogOpen}
                >
                    <DialogContent>
                        <DialogHeader>
                            <DialogClose className='ml-auto'>
                                <X className='h-6 w-6 text-foreground' />
                            </DialogClose>
                        </DialogHeader>
                        <ul className='flex flex-col gap-2'>
                            <li>
                                <Button
                                    variant='outline'
                                    onBg='white'
                                    onClick={() => onShareLinkClick()}
                                >
                                    Share link
                                </Button>
                            </li>
                            <li>
                                <Button
                                    variant='outline'
                                    onBg='white'
                                    onClick={() => onExportClick()}
                                >
                                    Export
                                </Button>
                            </li>
                            <li className='flex flex-col gap-1'>
                                <label 
                                    htmlFor='import'
                                    className='text-foreground font-medium text-sm'
                                >Import</label>
                                <input
                                    id='import'
                                    type='file'
                                    value={importInputValue}
                                    onChange={(e) => onImport(e.target.files?.[0])}
                                    // variant='outline'
                                    // onBg='white'
                                    // onClick={() => onImportClick()}
                                />
                            </li>
                        </ul>
                    </DialogContent>
                </Dialog>
            </nav>
            <main className='px-2 flex-grow'>
                <Outlet 
                    context={{
                        onStoreFormDialogOpen,
                        searchValue: currentPageSearchValue
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