export const leagueData: TLeague[] = [
    {
        id: '0001',
        name: 'RD Nice',
        lat: 43.710175,
        lon: 7.261953,
        geoapifyId: '5104238a24d5121d40593dcca843b8d94540f00101f9017498020000000000c00208'
    },
    {
        id: '0002',
        name: 'RD Bordeaux',
        lat: 44.837788,
        lon: -0.57918,
        geoapifyId: '5198aa0f7fa88fe2bf59efc9c342ad6b4640f00101f901369b010000000000c00207'
    },
    {
        id: '0003',
        name: 'RD Munich',
        lat: 48.135124,
        lon: 11.581981,
        geoapifyId: '51ac66e77e9826274059f9426dc08c114840f00101f901dcf3000000000000c00208'
    },
    {
        id: '0004',
        name: 'RD Brest',
        lat: 48.38987,
        lon: -4.48718,
        geoapifyId: '51d745764aacf111c059cc54d2d4fc314840f00101f9019c6b100000000000c00207'
    },
    {
        id: '0005',
        name: 'RD Madrid',
        lat: 40.4167,
        lon: -3.7167,
        geoapifyId: '51a94d9cdcefa00dc059744b619456354440f00101f901c047510000000000c00208'
    },
    {
        id: '0006',
        name: 'RD Hull',
        lat: 42.2861,
        lon: -70.8835,
        geoapifyId:
            '51d423b2b4f8b9d5bf597e9bb45f2ddf4a40f00103f901666d970100000000c0020792030448756c6c'
    },
    {
        id: '0007',
        name: 'RD Bergame',
        lat: 45.695,
        lon: 9.67,
        geoapifyId: '5169f7f58df95623405967dfcb33e5d84640f00101f90171b2000000000000c00208'
    }
];

export type TLeague = {
    id: string;
    name: string;
    lat: number;
    lon: number;
    geoapifyId: string;
};

/* export type TTeam = {
    id: string;
    name: string;
    level: 'n/a' | 'regional' | 'national' | 'international' | 'world' | 'unknown';
    type: 'A' | 'B' | 'C' | 'recreationnal';
    isWFTDA: boolean;
    isMRDA: boolean;
    isJRDA: boolean;
    isTravelTeam: boolean;
    isHomeTeam: boolean;
}; */
