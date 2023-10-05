import './drawerCreateEditLeague.less';

import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

import {useState, useEffect, useCallback, useMemo} from 'react';
import {t} from 'i18next';
import {useQuery} from 'react-query';
import {debounce} from 'lodash';

import {
    TCityAutocompletePayload,
    TLocationResult,
    getCityAutocomplete
} from '@api/geoapify/getCityAutocomplete';

import {TLeague} from '@templates/mocks';
import {checkPayloadValidity} from './useCheckForm';

type TEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

interface TCreateEditLeagueDrawer {
    isOpen: boolean;
    onClose: () => void;
    addMarker: (marker: TLeague) => void;
}

const DrawerCreateEditLeague = (props: TCreateEditLeagueDrawer) => {
    const {isOpen, onClose, addMarker} = props;

    const [wasFormSubmitted, setWasFormSubmitted] = useState<boolean>(false);
    const [leagueName, setLeagueName] = useState<string>('');
    const [leagueLocation, setLeagueLocation] = useState<TCitiesAutocompleteOption>({
        placeId: '',
        label: '',
        city: ''
    });

    const citiesQuery = useQuery(
        ['cities', leagueLocation],
        () => onSearchCity({text: leagueLocation.city}),
        {
            enabled: leagueLocation.city != null && leagueLocation.city.length > 2 // geoapify api requires at least 3 characters
        }
    );

    const city = useMemo(() => {
        if (citiesQuery.data == null) return;
        return citiesQuery.data.results.find(
            (result) => result.place_id === leagueLocation.placeId
        );
    }, [citiesQuery.data, leagueLocation.placeId]);

    const onChangeCityLabel = (newValue: string | null) => {
        newValue === null
            ? setLeagueLocation({placeId: '', label: '', city: ''})
            : setLeagueLocation((state) => ({
                  ...state,
                  ['label']: newValue,
                  ['city']: newValue
              }));
    };

    const onChooseCityOption = (newOption: TCitiesAutocompleteOption | null) => {
        return newOption === null
            ? setLeagueLocation({placeId: '', label: '', city: ''})
            : setLeagueLocation(() => newOption);
    };

    const onSearchCity = (args: TCityAutocompletePayload) => {
        if (args.text.length > 0) return getCityAutocomplete(args);
    };

    const debounceGetCities = useCallback(
        debounce(() => citiesQuery.refetch(), 500),
        []
    );

    useEffect(() => {
        debounceGetCities();
    }, [leagueLocation]);

    type TCitiesAutocompleteOption = {
        placeId: string;
        label: string;
        city: string;
    };
    const cityAutocompleteOptions: TCitiesAutocompleteOption[] = useMemo(() => {
        if (citiesQuery.data) {
            const initialOption = leagueLocation.placeId === '' ? [leagueLocation] : [];
            return [
                ...initialOption,
                ...citiesQuery.data.results.map((matchingResult) => ({
                    placeId: matchingResult.place_id,
                    label: matchingResult.formatted,
                    city: matchingResult.city
                }))
            ];
        }
        return [];
    }, [citiesQuery.data, leagueLocation]);

    function buildFormPayload(city: TLocationResult): TLeague {
        return {
            name: leagueName,
            id: leagueLocation.placeId,
            lat: city?.lat,
            lon: city?.lon
        };
    }

    const invalidFields = useMemo(() => {
        if (!wasFormSubmitted) return [];
        return checkPayloadValidity(buildFormPayload(city!));
    }, [leagueName, leagueLocation, city, wasFormSubmitted]);

    function onSubmit() {
        if (!wasFormSubmitted) setWasFormSubmitted(true);
        if (citiesQuery.data == null) return;
        if (invalidFields.length !== 0) return;
        else {
            const payload = buildFormPayload(city!);
            if (checkPayloadValidity(payload).length === 0) {
                addMarker(payload);
                handleClose();
            }
        }
    }

    function handleClose() {
        setLeagueName('');
        setLeagueLocation({placeId: '', label: '', city: ''});
        setWasFormSubmitted(false);
        onClose();
    }

    return (
        <Drawer
            ModalProps={{disableScrollLock: false}}
            open={isOpen}
            anchor='left'
            onClose={handleClose}
        >
            <div className='leagueDrawer'>
                <header>{t('league_form_title')}</header>

                <form
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px'
                    }}
                >
                    <TextField
                        id='name'
                        className='textField'
                        label={t('league_form_field_label_name')}
                        value={leagueName}
                        onChange={(event: TEvent) => setLeagueName(event.target.value)}
                        InputLabelProps={{
                            shrink: true
                        }}
                        error={invalidFields.includes('leagueName')}
                        helperText={
                            invalidFields.includes('leagueName') &&
                            t('league_form_field_label_name_error_message')
                        }
                    />

                    <Autocomplete
                        id='city_autocomplete'
                        options={cityAutocompleteOptions}
                        getOptionLabel={(option) => option.label}
                        value={leagueLocation}
                        isOptionEqualToValue={(option, value) => option.placeId === value.placeId}
                        onInputChange={(event, newValue) => onChangeCityLabel(newValue)}
                        onChange={(event, newValue) => onChooseCityOption(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={t('league_form_field_label_city')}
                                error={invalidFields.includes('leagueLocation')}
                                helperText={
                                    invalidFields.includes('leagueLocation') &&
                                    t('league_form_field_label_name_error_city')
                                }
                            />
                        )}
                    />
                </form>

                <div className='actions'>
                    <Button variant='contained' onClick={onSubmit}>
                        <span>{t('league_form_button_submit')}</span>
                    </Button>
                </div>
            </div>
        </Drawer>
    );
};

export default DrawerCreateEditLeague;
