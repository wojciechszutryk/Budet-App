import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSun, faMoon, faCloud} from "@fortawesome/free-solid-svg-icons";
import {NavLink } from 'react-router-dom'
import {Container, List, NavigationWrapper} from './NavigationStyles'
import {useTranslation} from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher";
import {InlineButton, SetDarkButton, SetLightButton} from "../Button/ButtonStyles";

const Navigation = ({pages= [], theme, themeSet}) => {
    const {t} = useTranslation();

    const list = pages.map(page => (
        <li key={page.name}>
            <NavLink exact activeClassName="selected" to={page.link}>
                <InlineButton>
                    {t(page.name)}
                </InlineButton>
            </NavLink >
        </li>
    ))

    return (
        <Container>
            <NavigationWrapper>
                <List>
                    {list}
                </List>
                {
                    theme === 'lightTheme' ?
                        <SetDarkButton onClick={themeSet}><FontAwesomeIcon icon={faCloud} /><FontAwesomeIcon icon={faMoon} /></SetDarkButton> :
                        <SetLightButton onClick={themeSet}><FontAwesomeIcon icon={faCloud} /><FontAwesomeIcon icon={faSun} /></SetLightButton>
                }
                <LanguageSwitcher/>
            </NavigationWrapper>
        </Container>
    );
};

export default Navigation;
