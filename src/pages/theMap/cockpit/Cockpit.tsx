import './cockpit.less';
import AddSquareIcon from '@ant-design/icons/PlusSquareOutlined';

import {useTranslation} from 'react-i18next';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {Icon} from '@mui/material';

interface TCockpit {
    openNewLeagueDrawer: () => void;
}
const Cockpit = (props: TCockpit) => {
    const {t} = useTranslation();
    const {openNewLeagueDrawer} = props;

    return (
        <div className='cockpitContainer'>
            <div className='cockpit'>
                <IconButton onClick={() => openNewLeagueDrawer()}>
                    <AddSquareIcon style={{fontSize: '34px', color: 'aliceblue'}} />
                </IconButton>
            </div>
        </div>
    );
};

export default Cockpit;
