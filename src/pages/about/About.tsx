import './about.less';

import {useEffect, useState} from 'react';
import i18next from 'i18next';
import {useTranslation} from 'react-i18next';

import {getRepoMainActivity} from '@api/github/getGithubInfo';

const AboutPage = () => {
    const {t} = useTranslation();
    const currentLocale = i18next.language;

    const [lastActivity, setLastActivity] = useState<string | null>(null);

    useEffect(() => {
        async function getLastActivity() {
            getRepoMainActivity().then((data) => {
                setLastActivity(data);
            });
        }
        getLastActivity();
    }, []);

    const lastActivityDate = lastActivity
        ? new Intl.DateTimeFormat(currentLocale, {dateStyle: 'medium'}).format(
              new Date(lastActivity)
          )
        : 'n/a';

    return (
        <div className='about'>
            <h3>{t('about_teaser_title')}</h3>
            <p>{t('about_teaser')}</p>
            <h3>Techs</h3>
            {t('about_dev_state')} <br />
            {t('about_last_contribution')} : {lastActivityDate} <br />
            <p>
                <b>Front</b> <br />
                React + typescript <br />
                TanStack Query <br />
                <br />
                <b>Back</b> <br />
                <i>... to be continued</i> <br />
            </p>
            <p>
                <b>{t('about_external_help')}</b>
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
