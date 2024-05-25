import { Store } from '#/types/Store';
import { SelectIcon, SelectProps } from '@radix-ui/react-select';
import { Select, SelectTrigger, SelectContent, SelectItem } from './Select';
import { useState } from 'react';

type StoreSelectProps = SelectProps & {
    stores: Store[]
}

export default function StoreSelect( { stores, onValueChange }: StoreSelectProps) {

    const [value, setValue] = useState<number | undefined>(undefined);

    return (
        <Select
            value={value?.toString()}
            onValueChange={(value) => setValue(parseInt(value))}
        >
            <SelectTrigger
                className='!w-6 !h-6 !p-0 !rounded-full'
                style={{
                    backgroundColor: stores.find(store => store.id.toString() == value)?.color || 'transparent'
                }}
                showIcon={false}
            >
            </SelectTrigger>
            <SelectContent className='bg-background text-foreground'>
                {stores.map(store => (
                    <SelectItem
                        value={store.id.toString()}
                        icon={
                            <div 
                                className='h-3 w-3 rounded-full'
                                style={{
                                    backgroundColor: store.color
                                }}
                            ></div>
                        }
                    >
                        {store.name}
                    </SelectItem>
                ))}
                {/* <SelectItem 
                    value='2' 
                    icon={
                    
                    }>
                    Store 1
                    
                </SelectItem>
                <SelectItem value='1'>
                    Store 2
                </SelectItem>
                <SelectItem value='3'>
                    Store 3
                </SelectItem>
                <SelectItem value='4'>
                    Store 4
                </SelectItem> */}
            </SelectContent>
        </Select>
    )
}