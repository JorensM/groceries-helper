import { Store } from '#/types/Store';
import { Select, SelectTrigger, SelectContent, SelectItem } from './Select';

type StoreSelectProps = {
    stores: Store[]
}

export default function StoreSelect( { stores }: StoreSelectProps) {
    return (
        <Select>
            <SelectTrigger
                className='!w-6 !h-6 !p-0 bg-green-200 !rounded-full'
            >

            </SelectTrigger>
            <SelectContent className='bg-background text-foreground'>
                {stores.map(store => (
                    <SelectItem
                        value={store.id.toString()}
                        icon={
                            <div 
                                className='h-3 w-3rounded-full'
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