import { buildQueryString } from '@api/utils_api';

export type TCityAutocompletePayload = {
    text: string;
};

export async function getCityAutocomplete(args: TCityAutocompletePayload) {
    const { text } = args;

    const params = {
        apiKey: import.meta.env.VITE_GEOAPIFY_KEY,
        text: text,
        type: 'city',
        lang: 'fr',
        format: 'json',
    };

    const baseURl = `https://api.geoapify.com/v1/geocode/autocomplete`;
    const url = baseURl + buildQueryString(params);

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
}
