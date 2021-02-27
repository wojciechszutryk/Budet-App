import React from 'react';
import {NavLink } from 'react-router-dom'
import PropTypes from 'prop-types';

import {Container, List, NavigationWrapper} from './NavigationStyles'
import './index.css'
import {useTranslation} from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher";

const Navigation = ({pages= []}) => {

    const {t} = useTranslation();

    const list = pages.map(page => (
        <li key={page.name}>
            <NavLink exact activeClassName="selected" to={page.link}>{t(page.name)}</NavLink >
        </li>
    ))

    return (
        <Container>
            <NavigationWrapper>
                <List>
                    {list}
                </List>
                <LanguageSwitcher/>
            </NavigationWrapper>
        </Container>
    );
};

Navigation.propTypes = {
    pages: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
    })).isRequired,
};

export default Navigation;
