export const leagueData: TLeague[] = [
    {id: '0001', name: 'RD Nice', lat: 43.710175, lon: 7.261953},
    {id: '0002', name: 'RD Bordeaux', lat: 44.837788, lon: -0.57918},
    {id: '0003', name: 'RD Munich', lat: 48.135124, lon: 11.581981},
    {id: '0004', name: 'RD Brest', lat: 48.38987, lon: -4.48718},
    {id: '0005', name: 'RD Madrid', lat: 40.4167, lon: -3.7167},
    {id: '0006', name: 'RD Hull', lat: 42.2861, lon: -70.8835},
    {id: '0007', name: 'RD Bergame', lat: 45.695, lon: 9.67}
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
