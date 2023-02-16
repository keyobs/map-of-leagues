import './theMap.less';
import { t } from 'i18next';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { leagueData } from '@templates/mocks';
import { useState } from 'react';
import { Button, Drawer } from '@mui/material';

const TheMapPage = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const onClose = () => setIsOpen(false);
    const addALeague = () => {
        setIsOpen(true);
    };

    return (
        <div className="theMap">
            <div className="cockpit">
                <Cockpit addALeague={addALeague} />
            </div>
            <div className="leafletContainer">
                <Map />
            </div>
            <CreateEditLeagueDrawer isOpen={isOpen} onClose={onClose} />
        </div>
    );
};
export default TheMapPage;

interface TCockpit {
    addALeague: () => void;
}
const Cockpit = (props: TCockpit) => {
    const { addALeague } = props;
    return (
        <Button variant="contained" onClick={() => addALeague()}>
            ADD A LEAGUE
        </Button>
    );
};

const Map = () => {
    const [activeMark, setActiveMark] = useState<string | null>(null);
    console.log(activeMark);

    return (
        <MapContainer center={[47.4, 7.7]} zoom={5} scrollWheelZoom={false}>
            {[...leagueData].map((league) => (
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

interface TCreateEditLeagueDrawer {
    isOpen: boolean;
    onClose: () => void;
}
const CreateEditLeagueDrawer = (props: TCreateEditLeagueDrawer) => {
    const { isOpen, onClose } = props;

    return (
        <Drawer open={isOpen} anchor="right" onClose={onClose}>
            <div>Hop hop</div>
        </Drawer>
    );
};
