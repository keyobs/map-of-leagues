import './theMap.less';
import { t } from 'i18next';

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { leagueData } from '@templates/mocks';

const TheMapPage = () => {
    return (
        <div className="theMap">
            <Map />
        </div>
    );
};
export default TheMapPage;

const Map = () => {
    return (
        <div className="leafletContainer">
            <MapContainer center={[47.4, 7.7]} zoom={5} scrollWheelZoom={false}>
                {[...leagueData].map((league) => (
                    <Marker key={league.id} position={league.coordinates} />
                ))}

                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
            </MapContainer>
        </div>
    );
};
