// Core
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { NavItem, mainNavigation } from './constants/navigation';

// Components
import { Drawer, DrawerContent, DrawerTrigger } from './components/Drawer';
import { Button } from './components/input/Button';

export default function AppLayout() {

    const location = useLocation();
    const navigate = useNavigate();

    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    const onNavItemClick = (navItem: NavItem) => {
        navigate(navItem.path);
        setIsDrawerOpen(false);
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