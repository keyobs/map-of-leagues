import { useTranslation } from 'react-i18next';

import Button from '@mui/material/Button';

interface TCockpit {
    openNewLeagueDrawer: () => void;
}
const Cockpit = (props: TCockpit) => {
    const { t } = useTranslation();
    const { openNewLeagueDrawer } = props;

    return (
        <Button variant="contained" onClick={() => openNewLeagueDrawer()}>
            {t('map_cockpit_button_add_new_league')}
        </Button>
    );
};

export default Cockpit;
