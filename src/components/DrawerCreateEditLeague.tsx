import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { useState, useEffect, useCallback } from 'react';
import { t } from 'i18next';
import { useQuery } from 'react-query';
import { debounce } from 'lodash';

import {
    TCityAutocompletePayload,
    getCityAutocomplete,
} from '@api/geoapify/getCityAutocomplete';

type TEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

interface TCreateEditLeagueDrawer {
    isOpen: boolean;
    onClose: () => void;
}
const DrawerCreateEditLeague = (props: TCreateEditLeagueDrawer) => {
    const { isOpen, onClose } = props;

    const [leagueName, setLeagueName] = useState<string>('');
    const [leagueCity, setLeagueCity] = useState<TCitiesAutocompleteOption>({
        placeId: '',
        label: '',
        city: '',
    });

    const onChangeCityLabel = (newValue: string | null) => {
        newValue === null
            ? setLeagueCity({ placeId: '', label: '', city: '' })
            : setLeagueCity((state) => ({
                  ...state,
                  ['label']: newValue,
                  ['city']: newValue,
              }));
    };

    const onChooseCityOption = (
        newOption: TCitiesAutocompleteOption | null
    ) => {
        return newOption === null
            ? setLeagueCity({ placeId: '', label: '', city: '' })
            : setLeagueCity(() => newOption);
    };

    const onSearchCity = (args: TCityAutocompletePayload) => {
        return getCityAutocomplete(args);
    };

    const citiesQuery = useQuery(
        ['cities', leagueCity],
        () => onSearchCity({ text: leagueCity.city }),
        {
            enabled: false,
        }
    );

    const debounceGetCities = useCallback(
        debounce(() => citiesQuery.refetch(), 1500),
        []
    );

    useEffect(() => {
        if (leagueCity.city !== '') debounceGetCities();
    }, [leagueCity]);

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
                        value={leagueCity}
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
            </div>
        </Drawer>
    );
};

export default DrawerCreateEditLeague;