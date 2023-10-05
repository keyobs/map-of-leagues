import {TLeague} from '@templates/mocks';

export function checkPayloadValidity(payload: TLeague) {
    const {name, lat, lon} = payload;

    const invalidFields = [];
    if (name === '') invalidFields.push('leagueName');
    if (lat == null || lon == null) invalidFields.push('leagueLocation');

    return invalidFields;
}
