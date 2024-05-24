export type ID = number;

export type ItemCreate<T> = Omit<T, 'id'>;

export type ItemUpdate<T> = Partial<T> & { id: ID }