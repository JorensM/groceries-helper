import useGroceriesStore from '#/state/groceriesStore'

export default function HomePage() {

    const groceries = useGroceriesStore();

    return (
        <div className='flex flex-col h-full'>
            <div className='flex flex-grow items-center justify-center text-center text-neutral-400'>
                {groceries.items.length ? 
                    "Welcome back."
                :
                    "Welcome to Groceries Helper. To start, add some items in the 'All groceries' page."
                }
                
            </div>
        </div>
    )
}