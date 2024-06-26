// Constants
import { Grocery } from '#/types/Grocery';
import { Store } from '#/types/Store';

export type SharedFormat = 'jsonblob'

console.log('APP URL: ', APP_URL);

async function getGroceriesLinkJSONBlob(groceries: Grocery[], stores: Store[]): Promise<URL> {
    const data = {
        groceries,
        stores
    }
    const res = await fetch('https://jsonblob.com/api/jsonBlob', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if(!res.ok) {
        throw new Error('An error occured while creating grocery list link')
    }

    const jsonBlobLink = res.headers.get('Location');

    if(!jsonBlobLink) {
        throw new Error('Could not get JSON Blob link from Location header');
    }

    const fullURL = new URL(location.href);

    const sharedFormat: SharedFormat = 'jsonblob'

    fullURL.searchParams.append('shared-format', sharedFormat);
    fullURL.searchParams.append('shared-code', jsonBlobLink.split('/').pop()!)

    return fullURL;
}



const getGroceriesLink = getGroceriesLinkJSONBlob;

export default getGroceriesLink;