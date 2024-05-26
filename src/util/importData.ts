// Types
import { Grocery } from '#/types/Grocery';
import { Store } from '#/types/Store';

export default function importData(file: File): Promise<{ groceries: Grocery[], stores: Store[]}> {
    if(!file.type.includes('json')) throw new Error('File must be a .json file')
    return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const result = e.target?.result;
            if(!result) throw new Error('Could not read file')
            resolve(JSON.parse(result as string))
        }

        reader.readAsText(file);
    })
    
}