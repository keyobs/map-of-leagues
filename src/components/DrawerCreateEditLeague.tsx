import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

import { useState, useEffect, useCallback } from 'react';
import { t } from 'i18next';
import { useQuery } from 'react-query';
import { debounce } from 'lodash';

import {
    TCityAutocompletePayload,
    getCityAutocomplete,
} from '@api/geoapify/getCityAutocomplete';

import { TLeague } from '@templates/mocks';
type TEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

interface TCreateEditLeagueDrawer {
    isOpen: boolean;
    onClose: () => void;
    addMarker: (marker: TLeague) => void;
}
const DrawerCreateEditLeague = (props: TCreateEditLeagueDrawer) => {
    const { isOpen, onClose, addMarker } = props;

    const [leagueName, setLeagueName] = useState<string>('');
    const [leagueLocation, setLeagueLocation] =
        useState<TCitiesAutocompleteOption>({
            placeId: '',
            label: '',
            city: '',
        });

    const onChangeCityLabel = (newValue: string | null) => {
        newValue === null
            ? setLeagueLocation({ placeId: '', label: '', city: '' })
            : setLeagueLocation((state) => ({
                  ...state,
                  ['label']: newValue,
                  ['city']: newValue,
              }));
    };

    const onChooseCityOption = (
        newOption: TCitiesAutocompleteOption | null
    ) => {
        return newOption === null
            ? setLeagueLocation({ placeId: '', label: '', city: '' })
            : setLeagueLocation(() => newOption);
    };

    const onSearchCity = (args: TCityAutocompletePayload) => {
        return getCityAutocomplete(args);
    };

    const citiesQuery = useQuery(
        ['cities', leagueLocation],
        () => onSearchCity({ text: leagueLocation.city }),
        {
            enabled: false,
        }
    );

    const debounceGetCities = useCallback(
        debounce(() => citiesQuery.refetch(), 500),
        []
    );

    useEffect(() => {
        if (leagueLocation.city !== '') debounceGetCities();
    }, [leagueLocation]);

    type TCitiesAutocompleteOption = {
        placeId: string;
        label: string;
        city: string;
    };
    const cityAutocompleteOptions = (): TCitiesAutocompleteOption[] => {
        if (citiesQuery.data) {
            return citiesQuery.data.results.map((matchingResult) => ({
                placeId: matchingResult.place_id,
                label: matchingResult.formatted,
                city: matchingResult.city,
            }));
        }
        return [];
    };

    function onSubmit() {
        if (citiesQuery.data == null) return;
        if (leagueLocation.placeId === '') return;

        const city = citiesQuery.data.results.find(
            (result) => result.place_id === leagueLocation.placeId
        );

        if (city == null) return;

        const payload: TLeague = {
            name: leagueName,
            id: leagueLocation.placeId,
            coordinates: [city.lat, city.lon],
        };

        addMarker(payload);
    }

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

                <form
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                    }}
                >
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
                        value={leagueLocation}
                        isOptionEqualToValue={(option, value) =>
                            option.placeId === value.placeId
                        }
                        onInputChange={(event, newValue) =>
                            onChangeCityLabel(newValue)
                        }
                        onChange={(event, newValue) =>
                            onChooseCityOption(newValue)
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={t('league_form_field_label_city')}
                            />
                        )}
                    />
                </form>

                <div>
                    <Button variant="contained" onClick={onSubmit}>
                        <span>{t('league_form_button_submit')}</span>
                    </Button>
                </div>
            </div>
        </Drawer>
    );
};

export default DrawerCreateEditLeague;
