import { ImportData } from '#/types/misc';
import { SharedFormat } from './getGroceriesLink';

const getDataFromLink = async (link: URL | string): Promise<ImportData> => {
    const url = new URL(link);

    const sharedFormat: SharedFormat = url.searchParams.get('shared-format') as SharedFormat;
    const sharedCode = url.searchParams.get('shared-code');

    if(!sharedFormat || !sharedCode) {
        throw new Error('Could not retrieve saved groceries - missing URL params');
    }

    if(sharedFormat == 'jsonblob') {
        return await getDataFromJSONBlob(sharedCode);
    }

    throw new Error('Incorrect link for sharing');
}

const getDataFromJSONBlob = async (code: string): Promise<ImportData> => {
    const res = await fetch('https://jsonblob.com/api/jsonBlob/' + code);

    if(!res.ok) {
        throw new Error('An error occured while retrieving groceries from JSONBlob');
    }

    const data = await res.json();

    return data;
}

export default getDataFromLink;