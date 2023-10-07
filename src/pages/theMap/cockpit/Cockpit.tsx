import './cockpit.less';
import AddSquareIcon from '@ant-design/icons/PlusSquareOutlined';

import {useTranslation} from 'react-i18next';

import DrawerCreateEditLeague from '@pages/theMap/leagueDrawer/DrawerCreateEditLeague';

import IconButton from '@mui/material/IconButton';
import {useState} from 'react';

const Cockpit = () => {
    const {t} = useTranslation();

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
                    isOpen={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                />
            </div>
        </div>
    );
};

export default Cockpit;
