import {checkPayloadValidity} from './useCheckForm';

import {describe, test, expect} from 'vitest';
import {TLeague} from '@templates/mocks';

describe('checkPayloadValidity', () => {
    test('returns invalid fields for empty league name', () => {
        const payload: TLeague = {
            id: '1',
            name: '',
            geoapifyId: '123',
            lat: 40.7128,
            lon: -74.006
        };

        const result = checkPayloadValidity(payload);
        expect(result).toContain('leagueName');
        expect(result).not.toContain('leagueLocation');
    });

    test('returns invalid fields if latitude and longitude are null', () => {
        const payload: TLeague = {
            id: '1',
            name: 'My League',
            geoapifyId: '123',
            lat: null,
            lon: null
        };

        const result = checkPayloadValidity(payload);
        expect(result).toContain('leagueLocation');
        expect(result).not.toContain('leagueName');
    });

    test('returns empty array for a valid payload', () => {
        const payload: TLeague = {
            id: '1',
            name: 'My League',
            geoapifyId: '123',
            lat: 40.7128,
            lon: -74.006
        };

        const result = checkPayloadValidity(payload);
        expect(result).toEqual([]);
    });
});
