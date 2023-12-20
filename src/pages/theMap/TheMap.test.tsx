import {render} from '@testing-library/react';

import {QueryClient, QueryClientProvider} from 'react-query';
import TheMapPage from '@pages/theMap/TheMap';
import {leagueData} from '@templates/mocks';

describe('TheMapPage', () => {
    const queryClient = new QueryClient();

    test('should render the map', async () => {
        const {container} = await render(
            <QueryClientProvider client={queryClient}>
                <TheMapPage />
            </QueryClientProvider>
        );

        expect(container.querySelector('.leaflet-container')).toBeInTheDocument();
    });

    test('should render the markers', async () => {
        const {container} = await render(
            <QueryClientProvider client={queryClient}>
                <TheMapPage />
            </QueryClientProvider>
        );

        expect(container.querySelector('.leaflet-marker-icon')).toBeInTheDocument();
    });

    test('should render the same number of markers as in the mock data', async () => {
        const {container} = await render(
            <QueryClientProvider client={queryClient}>
                <TheMapPage />
            </QueryClientProvider>
        );

        expect(container.querySelectorAll('.leaflet-marker-icon').length).toBe(leagueData.length);
    });

    test('should render the cockpit', async () => {
        const {container} = await render(
            <QueryClientProvider client={queryClient}>
                <TheMapPage />
            </QueryClientProvider>
        );

        expect(container.querySelector('.cockpit')).toBeInTheDocument();
    });
});
