import { buildQueryString } from '@api/utils_api';

export type TCityAutocompletePayload = {
    text: string;
};

export async function getCityAutocomplete(
    args: TCityAutocompletePayload
): Promise<TGeoApifyAutocomplete> {
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
    return data;
}

export type TLocationResult = {
    address_line1: string;
    address_line2: string;
    bbox: {
        lat1: number;
        lat2: number;
        lon1: number;
        lon2: number;
    };
    category: string;
    city: string;
    country: string;
    country_code: string;
    county: string;
    datasource: {
        attribution: string;
        license: string;
        sourcename: string;
        url: string;
    };
    formatted: string;
    lat: number;
    lon: number;
    name: string;
    place_id: string;
    postcode: string;
    rank: {
        confidence: number;
        confidence_city_level: number;
    };
    result_type: string;
    timezone: {
        abbreviation_DST: string;
        abbreviation_STD: string;
        name: string;
        offset_DST: string;
        offset_DST_seconds: number;
        offset_STD: string;
        offset_STD_seconds: number;
    };
    village: string;
};

export type TGeoApifyAutocomplete = {
    query: TGeoApifyAutocompleteQuery;
    results: TLocationResult[];
};

export type TGeoApifyAutocompleteQuery = {
    parsed: { city: string; expected_type: string };
    text: string;
};
