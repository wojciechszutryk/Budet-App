import React, {useEffect, useState} from 'react';
import LanguageButton from './LanguageButton'
import {useTranslation} from "react-i18next";

const LanguageSwitcher = () => {
    const [language, setLanguage] = useState('en')
    const { i18n } = useTranslation();

    const changeLanguage = React.useCallback((lng) =>  {
        const availableLanguages = ['en', 'de', 'pl']
        if (availableLanguages.includes(lng)) setLanguage(lng);
        i18n.changeLanguage(lng);
    },[i18n]);

    useEffect(()=>{
        changeLanguage(navigator.language);
    },[changeLanguage])

    return (
        <div>
            <LanguageButton active={language === 'en'} onClick={() => changeLanguage('en')}>En</LanguageButton>
            <LanguageButton active={language === 'de'} onClick={() => changeLanguage('de')}>De</LanguageButton>
            <LanguageButton active={language === 'pl'} onClick={() => changeLanguage('pl')}>Pl</LanguageButton>
        </div>
    );
};

export default LanguageSwitcher;
