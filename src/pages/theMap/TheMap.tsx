import './theMap.less';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { useState, useEffect } from 'react';
import { t } from 'i18next';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useQuery } from 'react-query';

import { leagueData } from '@templates/mocks';

import {
    TCityAutocompletePayload,
    getCityAutocomplete,
} from '@api/geoapify/getCityAutocomplete';

type TEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const TheMapPage = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

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
                <Map />
            </div>
            <CreateEditLeagueDrawer isOpen={isOpen} onClose={onClose} />
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

const Map = () => {
    const [activeMark, setActiveMark] = useState<string | null>(null);

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

    const [leagueName, setLeagueName] = useState<string>('');
    const [leagueCity, setLeagueCity] = useState<TCitiesAutocompleteOption>({
        placeId: '',
        label: '',
    });

    const onChangeCityLabel = (newValue: string) => {
        console.log('newValue', newValue);
        newValue === null
            ? setLeagueCity({ placeId: 'fluff', label: 'gimbam' })
            : setLeagueCity((state) => ({ ...state, ['label']: newValue }));
    };

    const onSearchCity = (args: TCityAutocompletePayload) => {
        return getCityAutocomplete(args);
    };

    const citiesQuery = useQuery(
        ['cities', leagueCity],
        () => onSearchCity({ text: leagueCity.label }),
        {
            enabled: false,
        }
    );

    useEffect(() => {
        if (leagueCity.label !== '') citiesQuery.refetch();
    }, [leagueCity]);

    type TCitiesAutocompleteOption = {
        placeId: string;
        label: string;
    };
    const cityAutocompleteOptions = (): TCitiesAutocompleteOption[] => {
        if (citiesQuery.data) {
            return citiesQuery.data.results.map((matchingResult) => ({
                placeId: matchingResult.place_id,
                label: `${matchingResult.city} (${matchingResult.county}) - ${matchingResult.country}`,
            }));
        }
        return [];
    };

    return (
        <Drawer
            ModalProps={{ disableScrollLock: false }}
            open={isOpen}
            anchor="left"
            onClose={onClose}
            BackdropProps={{ invisible: true }}
        >
            <div className="leagueDrawer">
                <header>{t('league_form_title')}</header>

                <form>
                    <TextField
                        id="name"
                        className="textField"
                        label={t('league_form_field_label_name')}
                        value={leagueName}
                        onChange={(event: TEvent) =>
                            setLeagueName(event.target.value)
                        }
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <Autocomplete
                        id="city_autocomplete"
                        options={cityAutocompleteOptions()}
                        getOptionLabel={(option) => option.label}
                        value={leagueCity}
                        isOptionEqualToValue={(option, value) =>
                            option.placeId === value.placeId
                        }
                        onInputChange={(event, newValue) =>
                            onChangeCityLabel(newValue)
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={t('league_form_field_label_city')}
                            />
                        )}
                    />
                </form>
            </div>
        </Drawer>
    );
};
