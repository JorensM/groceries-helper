import { Grocery } from '#/types/Grocery';
import { Store } from '#/types/Store';
import { ID, ItemCreate, ItemUpdate } from '#/types/misc';
import { getItemByID, getItemID } from '#/util/lists';
import DB from './DB';
import { AbstractCollection } from './DB';

const APP_ID = 'groceries-helper'

class LocalStorageCollection<T extends { id: ID }> extends AbstractCollection<T> {

    async getMaxID(): Promise<ID> {
        const maxID = JSON.parse(localStorage.getItem(APP_ID + '-maxid') || '10') + 1;
        localStorage.setItem(APP_ID + '-maxid', maxID);
        return maxID;
    }

    async getAll(): Promise<T[]> {
        const collectionItems = localStorage.getItem(APP_ID + '-' + this.id);
        if(!collectionItems) {
            localStorage.setItem(APP_ID + '-' + this.id, '[]');
        }
        return JSON.parse(collectionItems || '[]');
    }
    async setAll(items: T[]): Promise<boolean> {
        localStorage.setItem(APP_ID + '-' + this.id, JSON.stringify(items));
        return true;
    }
    async get(id: ID): Promise<T> {
        const allItems = await this.getAll();
        const item = allItems.find(item => item.id == id);
        if(!item) {
            throw new Error('Could not retrieve item with ID ' + id + ' from collection ' + this.id);
        }
        return item;
    }
    async update(item: ItemUpdate<T>): Promise<boolean> {
        const allItems = await this.getAll();
        const { item: oldItem, index } = getItemByID(allItems, item.id);
        allItems[index] = {
            ...oldItem,
            ...item
        }

        return await this.setAll(allItems);
    }
    async add(item: ItemCreate<T>): Promise<ID> {
        const maxID = await this.getMaxID();
        const allItems = await this.getAll();
        const newItem = {
            ...item,
            id: maxID
        } as T;
        allItems.push(newItem);

        this.setAll(allItems);

        return newItem.id;
    }

    async delete(item: number | ItemUpdate<T>): Promise<boolean> {
        const allItems = await this.getAll();
        const id = getItemID(item);
        const { index } = getItemByID(allItems, id);
        allItems.splice(index, 1);

        this.setAll(allItems);

        return true;
    }

    async set(item: T): Promise<boolean> {
        return this.update(item);
    }
}

const localStorageDB = new DB(
    new LocalStorageCollection<Grocery>('groceries'),
    new LocalStorageCollection<Store>('stores')
)

export default localStorageDB;