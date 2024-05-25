// Core
import { ReactNode } from 'react'

// Components
import { Button } from '../input/Button'

type ButtonListProps<T> = {
    items: T[],
    onItemClick: (item: T) => void,
    render: (item: T) => ReactNode,
    keyExtractor: (item: T) => string | number
}

/**
 * Button list. Needs to be put in a flexbox container for proper layout
 */
export default function ButtonList<T>( { items, render, onItemClick, keyExtractor }: ButtonListProps<T>) {
    return (
        <ul className='flex flex-col flex-grow gap-2 overflow-y-auto h-1'>
            {items.map(item => (
                <li key={keyExtractor(item)}>
                    <Button 
                        variant='ghost'
                        onClick={() => onItemClick(item)}
                        className='w-full flex justify-between'
                    >
                        {render(item)}
                    </Button>
                </li>
            ))}
        </ul>
    );
}