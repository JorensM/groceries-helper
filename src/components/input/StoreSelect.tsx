import { Store } from '#/types/Store';
import { Select, SelectTrigger, SelectContent, SelectItem } from './Select';
import { ID } from '#/types/misc';

type StoreSelectProps = {
    stores: Store[],
    onChange: (storeID: ID) => void,
    value: ID | undefined
}

export default function StoreSelect( { stores, value, onChange }: StoreSelectProps) {

    // const [value, setValue] = useState<number | undefined>(undefined);

    const handleChange = (newValue: string) => {
        const parsedValue = parseInt(newValue);
        // setValue(parsedValue);
        onChange(parsedValue);
    }
    
    return (
        <Select
            value={value?.toString()}
            onValueChange={handleChange}
        >
            <SelectTrigger
                className='!w-6 !h-6 !p-0 !rounded-full'
                style={{
                    backgroundColor: stores.find(store => store.id.toString() == value?.toString())?.color || 'transparent'
                }}
                showIcon={false}
            >
            </SelectTrigger>
            <SelectContent className='bg-background text-foreground'>
                {/* @ts-expect-error need to have a 'none selected' item */}
                <SelectItem value={undefined}>
                    None
                </SelectItem>
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