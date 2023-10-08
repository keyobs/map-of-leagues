import './about.less';
import {useTranslation} from 'react-i18next';

const AboutPage = () => {
    const {t} = useTranslation();
    return (
        <div className='about'>
            <h3>{t('about_teaser_title')}</h3>
            <p>{t('about_teaser')}</p>
            <h3>Techs</h3>
            {t('about_dev_state')}
            <p>
                Front <br />
                React + typescript <br />
                TanStack Query <br />
                <br />
                Back <br />
                <i>... to be continued</i> <br />
            </p>
            <p>
                {t('about_external_help')}
                <br />
                external api :{' '}
                <a href='https://www.geoapify.com/' target='_blank'>
                    geoapify
                </a>
            </p>
            <span>
                <i>{t('about_disclaimer')}</i>
            </span>
        </div>
    );
};
export default AboutPage;
