import './theMap.less';

import {useState} from 'react';
import {MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl} from 'react-leaflet';

import {leagueData, TLeague} from '@templates/mocks';

import Cockpit from '@pages/theMap/cockpit/Cockpit';

const TheMapPage = () => {
    const {markersList, addMarker} = useMarkers();

    return (
        <div className='theMap'>
            <Cockpit addMarker={addMarker} />
            <div className='leafletContainer'>
                <Map markersList={markersList} />
            </div>
        </div>
    );
};
export default TheMapPage;

type TMap = {
    markersList: TLeague[] | [];
};
const Map = (props: TMap) => {
    const {markersList} = props;
    const [activeMark, setActiveMark] = useState<string | null>(null);

    return (
        <MapContainer center={[47.4, 7.7]} zoom={5} scrollWheelZoom={true} zoomControl={false}>
            {markersList.map((league) => (
                <Marker
                    key={league.id}
                    position={[league.lat, league.lon]}
                    eventHandlers={{
                        click: () => {
                            setActiveMark(league.id);
                        }
                    }}
                >
                    <Popup>{league.name}</Popup>
                </Marker>
            ))}

            <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <ZoomControl position='bottomright' />
        </MapContainer>
    );
};

export function useMarkers() {
    const [markersList, setMarkersList] = useState<TLeague[]>([...leagueData]);

    const addMarker = (payload: TLeague) => {
        console.log('addMarker', payload);
        const newLeague = {...payload, id: getNextId(markersList.reverse()[0].id)}; //while waiting for the back
        setMarkersList((state) => [...state, newLeague]);
    };

    return {markersList, addMarker};
}

function getNextId(list: string) {
    const lastId = parseInt(list, 10);
    const newId = (lastId + 1).toString().padStart(4, '0');
    return newId;
}
