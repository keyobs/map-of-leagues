import './theMap.less';
import { t } from 'i18next';

import { MapContainer, TileLayer } from 'react-leaflet';

const TheMapPage = () => {
    return (
        <div className="theMap">
            <div className="leafletContainer">
                <MapContainer
                    center={[47.4, 7.7]}
                    zoom={5}
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                </MapContainer>
            </div>
        </div>
    );
};
export default TheMapPage;
