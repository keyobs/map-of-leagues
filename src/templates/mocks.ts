type TLeague = {
    id: string;
    name: string;
    coordinates: [number, number];
};

export const leagueData: TLeague[] = [
    { id: '0001', name: 'RD Nice', coordinates: [43.710175, 7.261953] },
    { id: '0002', name: 'RD Bordeaux', coordinates: [44.837788, -0.57918] },
    { id: '0003', name: 'RD Munich', coordinates: [48.135124, 11.581981] },
    { id: '0004', name: 'RD Brest', coordinates: [48.38987, -4.48718] },
    { id: '0005', name: 'RD Madrid', coordinates: [40.4167, -3.7167] },
    { id: '0006', name: 'RD Hull', coordinates: [42.2861, -70.8835] },
    { id: '0007', name: 'RD Bergame', coordinates: [45.695, 9.67] },
];
