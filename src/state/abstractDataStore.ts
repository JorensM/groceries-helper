// Classes
import { AbstractCollection } from '#/classes/DB';

// Types
import { ID, ItemCreate, ItemUpdate } from '#/types/misc';

// Utils
import { getItemByID, getItemID } from '#/util/lists';

export type AbstractDataStoreSlice<T extends { id: ID }> = {
    items: T[],
    add: (item: ItemCreate<T>) => Promise<void>
    set: (item: T) => Promise<void>
    setAll: (items: T[]) => Promise<boolean>
    update: (item: ItemUpdate<T>) => Promise<void>
    delete: (item: ItemUpdate<T> | ID) => Promise<void>
    upsertMany: (items: (ItemUpdate<T> | ItemCreate<T>)[]) => Promise<boolean>
    getAll: () => Promise<T[]>
    /**
     * Initialize the store by fetching data from database
     * @returns 
     */
    init: () => void
    /**
     * Whether the store has been initialized
     */
    initialized: boolean
}

type StateSetter<State> = (setter: (state: State) => Partial<State>) => void
type StateGetter<State> = () => State

export default function createAbstractDataStoreSlice<T extends { id: ID}>
(
    initial: T[],
    dbCollection: AbstractCollection<T>,
    onInit: ((items: T[]) => void) | undefined,
    _set: StateSetter<AbstractDataStoreSlice<T>>,
    _get: StateGetter<AbstractDataStoreSlice<T>>
): 
AbstractDataStoreSlice<T>
{   
    return ({
        items: initial,
        initialized: false,
        add: async (item: ItemCreate<T>) => {
            const id = await dbCollection.add(item);
            const newItem = {
                ...item,
                id
            } as T;
            _set((state) => ({
                items: [
                    ...state.items,
                    newItem
                ]
            }))
        },
        set: async (item: T) => {
            await dbCollection.set(item);
            _set((state) => {
                const newItems = [...state.items];
                const itemIndex = newItems.findIndex(_item => _item.id == item.id);
                newItems[itemIndex] = item;
                return {
                    items: newItems
                }
            });
        },
        setAll: async (items: T[]) => {
            await dbCollection.setAll(items);
            _set(() => ({items: items}));
            return true;
        },
        update: async (item: ItemUpdate<T>) => {
            await dbCollection.update(item);
            
            _set((state) => {
            //const itemIndex = state.todoItems.findIndex(_item => _item.id == item.id);
            //const oldItem = state.todoItems[itemIndex];
                const { item: oldItem, index: itemIndex } = getItemByID(state.items, item.id);
                if(!oldItem) {
                    throw new Error('Could not find item with ID' + item.id);
                }
                const newItems = [...state.items];
                newItems[itemIndex] = {
                    ...oldItem,
                    ...item
                }
                return {
                    items: newItems
                };
            })   
        },
        upsertMany: async (items: ((ItemUpdate<T> | ItemCreate<T>) & { id?: ID})[]) => {
            const originalItems = _get().items; 
            for(const updatedItem of items) {
                if(updatedItem.id && originalItems.findIndex(originalItem => originalItem.id == updatedItem.id) != -1) {
                    _get().update(updatedItem as ItemUpdate<T>);
                } else {
                    _get().add(updatedItem as ItemCreate<T>);
                }
            }
            return true;
        },
        delete: async (item: ItemUpdate<T> | ID) => {
            await dbCollection.delete(item);
            
            _set((state) => {
                const id = getItemID(item);
                const { index: itemIndex } = getItemByID(state.items, id);
                const newItems = [...state.items];
                newItems.splice(itemIndex, 1);
                return {
                    items: newItems
                }
            });
        },
        getAll: async () => {
            return _get().items;
        },
        init: async () => {

            const items = await dbCollection.getAll();
            
            //console.log('items: ', items);
            _set(() => {
                return {
                    items
                }
            });

            if(onInit) {
                await onInit(items);
            }
            
            _set(() => {
                return {
                    initialized: true
                }
            });
        }
    });
}