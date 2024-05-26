// Types
import { Grocery } from './Grocery';
import { Store } from './Store';

export type ID = number;

export type ItemCreate<T> = Omit<T, 'id'>;

export type ItemUpdate<T> = Partial<T> & { id: ID }

export type ImportData = {
    groceries: Grocery[],
    stores: Store[]
}