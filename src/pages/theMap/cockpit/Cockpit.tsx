import './cockpit.less';

import IconButton from '@mui/material/IconButton';
import AddSquareIcon from '@ant-design/icons/PlusSquareOutlined';

import {useState} from 'react';
import {useTranslation} from 'react-i18next';

import {TLeague} from '@templates/mocks';
import DrawerCreateEditLeague from '@pages/theMap/leagueDrawer/DrawerCreateEditLeague';

type TCockpit = {
    addMarker: (marker: TLeague) => void;
};
const Cockpit = (props: TCockpit) => {
    const {t} = useTranslation();
    const {addMarker} = props;
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    const onClickDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <div className='cockpitContainer'>
            <div className='cockpit'>
                <IconButton onClick={() => onClickDrawer()}>
                    <AddSquareIcon style={{fontSize: '34px', color: 'aliceblue'}} rev={undefined} />
                </IconButton>
            </div>
            <div className={`drawer ${isDrawerOpen ? 'visible' : 'hidden'}`}>
                <DrawerCreateEditLeague
                    addMarker={addMarker}
                    isOpen={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                />
            </div>
        </div>
    );
};

export default Cockpit;
