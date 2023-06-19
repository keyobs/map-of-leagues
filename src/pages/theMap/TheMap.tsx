import './theMap.less';
import Button from '@mui/material/Button';

import { useState, useEffect } from 'react';
import { t } from 'i18next';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import { leagueData } from '@templates/mocks';
import DrawerCreateEditLeague from '@components/DrawerCreateEditLeague';

import { TLeague } from '@templates/mocks';

const TheMapPage = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const { markersList, addMarker } = useMarkers();

    const onClose = () => setIsOpen(false);

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

interface TCockpit {
    openNewLeagueDrawer: () => void;
}
const Cockpit = (props: TCockpit) => {
    const { openNewLeagueDrawer } = props;
    return (
        <Button variant="contained" onClick={() => openNewLeagueDrawer()}>
            ADD A LEAGUE
        </Button>
    );
};

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
