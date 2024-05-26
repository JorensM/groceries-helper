// Types
import { Grocery } from '#/types/Grocery';
import { Store } from '#/types/Store';

export default function exportData(groceries: Grocery[], stores: Store[]) {
    const jsonData = {
        groceries,
        stores
    }

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
        type: 'application/json'
    })

    const date = new Date();

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `groceries-helper-export-${date.getDay()}-${date.getMonth()}-${date.getFullYear()}.json`;
    a.click();
    URL.revokeObjectURL(url);
}