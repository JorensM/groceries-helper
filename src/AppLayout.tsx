// Core
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { NavItem, mainNavigation } from './constants/navigation';

// Components
import { Drawer, DrawerContent, DrawerTrigger } from './components/Drawer';
import { Button } from './components/input/Button';
import useGroceriesStore from './state/groceriesStore';
import getGroceriesLink from './util/getGroceriesLink';

export default function AppLayout() {

    const getGroceries = useGroceriesStore((state) => state.getAll);

    const location = useLocation();
    const navigate = useNavigate();

    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    const onNavItemClick = (navItem: NavItem) => {
        navigate(navItem.path);
        setIsDrawerOpen(false);
    }

    const onShareLinkClick = async () => {
        const allGroceries = await getGroceries();
        if(!allGroceries.length) {
            alert('Please add some groceries before sharing a link');
        }
        const url = await getGroceriesLink(allGroceries);
        navigator.clipboard.writeText(url.href);
        alert(url.href);
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
                <Outlet />
            </main>
        </>
    )
}