// types
type QueryTypeBasic = string | number | boolean | null | undefined;
type QueryType = QueryTypeBasic | QueryTypeBasic[];

//
export function buildQueryString(queryParameters: {
    [key: string]: QueryType;
}) {
    const keyValues = Object.entries(queryParameters)
        .flatMap(flattenArrayValue)
        .filter(filterUnsupportedValue)
        .map(encode);

    return keyValues.length !== 0 ? '?' + keyValues.join('&') : '';
}

function flattenArrayValue([key, value]: [string, QueryType]): [
    string,
    QueryTypeBasic
][] {
    if (!Array.isArray(value)) {
        return [[key, value]];
    } else {
        return value.map((subValue) => [key, subValue]);
    }
}

function filterUnsupportedValue([, value]: [string, QueryTypeBasic]): boolean {
    return ['string', 'number', 'boolean'].includes(typeof value);
}

function encode([key, value]: [string, QueryTypeBasic]): string {
    if (value == null) return '';
    else return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
}
