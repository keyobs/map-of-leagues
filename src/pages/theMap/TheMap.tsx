import './theMap.less';

import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

import { leagueData, TLeague } from '@templates/mocks';

import Cockpit from '@components/cockpit/Cockpit';
import DrawerCreateEditLeague from '@components/Drawer/DrawerCreateEditLeague';

const TheMapPage = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { markersList, addMarker } = useMarkers();

    const onClose = () => {
        setIsOpen(false);
    };

    const openNewLeagueDrawer = () => {
        setIsOpen(true);
    };

    return (
        <div className="theMap">
            <div className="cockpit">
                <Cockpit openNewLeagueDrawer={openNewLeagueDrawer} />
            </div>
            <div className="leafletContainer">
                <Map markersList={markersList} />
            </div>
            <DrawerCreateEditLeague
                isOpen={isOpen}
                onClose={onClose}
                addMarker={addMarker}
            />
        </div>
    );
};
export default TheMapPage;

type TMap = {
    markersList: TLeague[] | [];
};
const Map = (props: TMap) => {
    const { markersList } = props;
    const [activeMark, setActiveMark] = useState<string | null>(null);

    return (
        <MapContainer center={[47.4, 7.7]} zoom={5} scrollWheelZoom={false}>
            {markersList.map((league) => (
                <Marker
                    key={league.id}
                    position={league.coordinates}
                    eventHandlers={{
                        click: () => {
                            setActiveMark(league.id);
                        },
                    }}
                >
                    <Popup>{league.name}</Popup>
                </Marker>
            ))}

            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
        </MapContainer>
    );
};

export function useMarkers() {
    const [markersList, setMarkersList] = useState<TLeague[]>([...leagueData]);

    const addMarker = (payload: TLeague) => {
        setMarkersList((state) => [...state, payload]);
    };

    return { markersList, addMarker };
}
